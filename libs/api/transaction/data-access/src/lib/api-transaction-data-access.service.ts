import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { ApiKineticService, TransactionWithErrors } from '@kin-kinetic/api/kinetic/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { parseAndSignTokenTransfer } from '@kin-kinetic/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { Prisma, Transaction, TransactionErrorType, TransactionStatus } from '@prisma/client'
import { Request } from 'express'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'

function getExpiredTime(minutes: number) {
  return new Date(new Date().getTime() - minutes * 60_000)
}

@Injectable()
export class ApiTransactionDataAccessService implements OnModuleInit {
  private logger = new Logger(ApiTransactionDataAccessService.name)

  private makeTransferRequestCounter: Counter

  constructor(readonly data: ApiCoreDataAccessService, readonly kinetic: ApiKineticService) {}

  async cleanupStaleTransactions() {
    const stale = await this.getExpiredTransactions()
    if (!stale.length) return
    this.timeoutTransactions(stale).then((res) => {
      this.logger.verbose(
        `cleanupStaleTransactions set ${stale?.length} stale transactions: ${res.map(
          (item) => `${item.id}=${item.status}`,
        )} `,
      )
    })
  }

  private getExpiredTransactions(): Promise<Transaction[]> {
    const expiredMinutes = 1
    const expired = getExpiredTime(expiredMinutes)
    return this.data.transaction.findMany({
      where: {
        status: { notIn: [TransactionStatus.Finalized, TransactionStatus.Failed] },
        updatedAt: { lt: expired },
      },
    })
  }

  private timeoutTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    return Promise.all(transactions.map((transaction) => this.verifyTransaction(transaction)))
  }

  private async verifyTransaction({
    appKey,
    createdAt,
    headers,
    id: transactionId,
    signature,
    solanaStart,
    status,
  }: Transaction): Promise<Transaction> {
    this.logger.verbose(`verifyTransaction: ${transactionId} ${appKey} ${status} ${signature}`)
    if (appKey && signature) {
      try {
        const status = await this.kinetic.getSignatureStatus(appKey, signature)

        if (status?.confirmationStatus === 'finalized') {
          const solana = await this.kinetic.getSolanaConnection(appKey)
          const solanaTransaction = await solana.connection.getParsedTransaction(signature, 'finalized')
          const finalizedTx = await this.kinetic.storeFinalizedTransaction(
            appKey,
            transactionId,
            signature,
            solanaStart,
            createdAt,
            solanaTransaction,
          )

          const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)

          // Send Event Webhook
          if (appEnv.webhookEventEnabled && appEnv.webhookEventUrl) {
            const eventWebhookTransaction = await this.kinetic.sendEventWebhook(
              appKey,
              appEnv,
              finalizedTx,
              headers as Record<string, string>,
            )
            if (eventWebhookTransaction.status === TransactionStatus.Failed) {
              this.logger.error(
                `Transaction ${transactionId} sendEventWebhook failed:${eventWebhookTransaction.errors
                  .map((e) => e.message)
                  .join(', ')}`,
                eventWebhookTransaction.errors,
              )
              return eventWebhookTransaction
            }
          }

          return finalizedTx
        }
      } catch (e) {
        return this.storeTransactionError(transactionId, `Error verifying transaction: ${e?.message || e?.toString()}`)
      }
    }

    const failed = await this.storeTransactionError(
      transactionId,
      signature ? `Transaction timed out` : 'Transaction never signed',
    )
    this.logger.verbose(`verifyTransaction: set ${transactionId} to Failed`)
    return failed
  }

  storeTransactionError(id: string, message: string) {
    return this.data.transaction.update({
      where: { id },
      data: {
        status: TransactionStatus.Failed,
        errors: {
          create: {
            type: TransactionErrorType.Timeout,
            message,
          },
        },
      },
    })
  }

  async onModuleInit() {
    this.makeTransferRequestCounter = this.data.metrics.getCounter(`api_transaction_make_transfer_request_counter`, {
      description: 'Number of requests to makeTransfer',
    })
    await this.migrateTransactionReferences()
  }

  async makeTransfer(req: Request, input: MakeTransferRequest): Promise<TransactionWithErrors> {
    const processingStartedAt = Date.now()
    const appKey = getAppKey(input.environment, input.index)
    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
    this.makeTransferRequestCounter.add(1, { appKey })

    const { ip, ua } = this.kinetic.validateRequest(appEnv, req)

    const mint = this.kinetic.validateMint(appEnv, appKey, input.mint)

    // Process the Solana transaction
    const signer = Keypair.fromSecret(mint.wallet?.secretKey)

    const {
      amount,
      blockhash,
      destination,
      feePayer,
      source,
      transaction: solanaTransaction,
    } = parseAndSignTokenTransfer({
      tx: Buffer.from(input.tx, 'base64'),
      signer: signer.solana,
    })

    return this.kinetic.processTransaction({
      amount,
      appEnv,
      appKey,
      blockhash,
      commitment: input?.commitment,
      decimals: mint?.mint?.decimals,
      destination: destination?.pubkey.toBase58(),
      feePayer,
      headers: req.headers as Record<string, string>,
      ip,
      lastValidBlockHeight: input?.lastValidBlockHeight,
      mintPublicKey: mint?.mint?.address,
      processingStartedAt,
      reference: input?.reference,
      solanaTransaction,
      source,
      tx: input.tx,
      ua,
    })
  }

  // MIGRATION: This migration will be removed in v1.0.0
  private async migrateTransactionReferences() {
    const count = await this.data.transaction.count({
      where: {
        OR: [{ referenceId: { not: null } }, { referenceType: { not: null } }],
      },
    })

    if (!count) {
      this.logger.verbose('migrateTransactionReferences: no transactions to migrate')
      return
    }

    const batchSize = 100
    const batches = Math.ceil(count / batchSize)
    this.logger.verbose(`migrateTransactionReferences: migrating ${count} transactions in ${batches} batches`)

    for (let i = 0; i < batches; i++) {
      const transactions = await this.data.transaction.findMany({
        where: {
          OR: [{ referenceId: { not: null } }, { referenceType: { not: null } }],
        },
        take: batchSize,
      })

      this.logger.verbose(
        `migrateTransactionReferences: migrating ${transactions.length} transactions in batch ${i}/${batches}`,
      )

      const updates: { id: string; data: Prisma.TransactionUpdateInput }[] = transactions.map((tx) => {
        let reference = null
        if (tx.referenceId && tx.referenceType) {
          reference = `${tx.referenceType}|${tx.referenceId}`
        } else if (tx.referenceId && !tx.referenceType) {
          reference = `${tx.referenceId}`
        } else if (!tx.referenceId && tx.referenceType) {
          reference = `${tx.referenceType}`
        }
        return {
          id: tx.id,
          data: { reference, referenceId: null, referenceType: null },
        }
      })

      const updated = await Promise.all(
        updates.map(async (update) => {
          return this.data.transaction.update({
            where: { id: update.id },
            data: update.data,
          })
        }),
      )

      this.logger.verbose(
        `migrateTransactionReferences: updated ${updated.length} transactions in batch ${i}/${batches}`,
      )
    }
  }
}
