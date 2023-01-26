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
        `cleanupStaleTransactions set ${stale?.length} stale transactions: ${res.map((item) => item.id)} `,
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

  private async verifyTransaction(transaction: Transaction): Promise<Transaction> {
    if (transaction?.appKey && transaction.signature) {
      const appEnv = await this.data.getAppEnvironmentByAppKey(transaction.appKey)
      const { blockhash, lastValidBlockHeight } = await this.kinetic.getLatestBlockhash(transaction.appKey)
      const tx = await this.kinetic.confirmSignature({
        appEnv,
        appKey: transaction.appKey,
        transactionId: transaction.id,
        blockhash,
        headers: transaction.headers as Record<string, string>,
        lastValidBlockHeight,
        signature: transaction.signature,
        solanaStart: transaction.solanaStart,
        transactionStart: transaction.createdAt,
      })

      if (tx?.status === 'Finalized') {
        this.logger.verbose(`verifyTransaction: set ${transaction.id} to Finalized`)
        return tx
      }
    }

    const failed = await this.data.transaction.update({
      where: { id: transaction.id },
      data: {
        status: TransactionStatus.Failed,
        errors: {
          create: {
            type: TransactionErrorType.Timeout,
            message: transaction.signature ? `Transaction timed out` : 'Transaction never signed',
          },
        },
      },
    })
    this.logger.verbose(`verifyTransaction: set ${transaction.id} to Failed`)
    return failed
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
    const transactions = await this.data.transaction.findMany({
      where: {
        OR: [{ referenceId: { not: null } }, { referenceType: { not: null } }],
      },
    })

    if (!transactions.length) {
      this.logger.verbose('migrateTransactionReferences: no transactions to migrate')
      return
    }
    this.logger.verbose(`migrateTransactionReferences: migrating ${transactions.length} transactions`)

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

    this.logger.verbose(`migrateTransactionReferences: updated ${updated.length} transactions`)
  }
}
