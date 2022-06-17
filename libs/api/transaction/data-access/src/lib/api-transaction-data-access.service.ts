import {
  ApiAppWebhookDataAccessService,
  AppEnv,
  AppTransaction,
  AppWebhookType,
  parseError,
} from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment, parseAndSignTokenTransfer } from '@kin-kinetic/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { AppTransactionErrorType, AppTransactionStatus, Prisma } from '@prisma/client'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'

@Injectable()
export class ApiTransactionDataAccessService implements OnModuleInit {
  private logger = new Logger(ApiTransactionDataAccessService.name)

  private makeTransferMintNotFoundErrorCounter: Counter
  private makeTransferRequestCounter: Counter
  private makeTransferSolanaCommittedCounter: Counter
  private makeTransferSolanaConfirmedCounter: Counter
  private makeTransferSolanaErrorCounter: Counter
  private makeTransferSolanaFinalizedCounter: Counter
  private makeTransferWebhookEventErrorCounter: Counter
  private makeTransferWebhookEventSuccessCounter: Counter
  private makeTransferWebhookVerifyErrorCounter: Counter
  private makeTransferWebhookVerifySuccessCounter: Counter

  constructor(readonly data: ApiCoreDataAccessService, private readonly appWebhook: ApiAppWebhookDataAccessService) {}

  onModuleInit() {
    const prefix = `api_transaction_make_transfer`
    this.makeTransferRequestCounter = this.data.metrics.getCounter(`${prefix}_request_counter`, {
      description: 'Number of requests to makeTransfer',
    })
    this.makeTransferMintNotFoundErrorCounter = this.data.metrics.getCounter(`${prefix}_error_mint_not_found_counter`, {
      description: 'Number of makeTransfer mint not found errors',
    })
    this.makeTransferSolanaCommittedCounter = this.data.metrics.getCounter(`${prefix}_solana_committed_counter`, {
      description: 'Number of makeTransfer committed Solana transactions',
    })
    this.makeTransferSolanaConfirmedCounter = this.data.metrics.getCounter(`${prefix}_solana_confirmed_counter`, {
      description: 'Number of makeTransfer confirmed Solana transactions',
    })
    this.makeTransferSolanaFinalizedCounter = this.data.metrics.getCounter(`${prefix}_solana_finalized_counter`, {
      description: 'Number of makeTransfer finalized Solana transactions',
    })
    this.makeTransferSolanaErrorCounter = this.data.metrics.getCounter(`${prefix}_solana_error_counter`, {
      description: 'Number of makeTransfer Solana errors',
    })
    this.makeTransferWebhookEventErrorCounter = this.data.metrics.getCounter(`${prefix}_webhook_event_error_counter`, {
      description: 'Number of makeTransfer webhook event errors',
    })
    this.makeTransferWebhookEventSuccessCounter = this.data.metrics.getCounter(
      `${prefix}_webhook_event_success_counter`,
      { description: 'Number of makeTransfer webhook event success' },
    )
    this.makeTransferWebhookVerifyErrorCounter = this.data.metrics.getCounter(
      `${prefix}_webhook_verify_error_counter`,
      { description: 'Number of makeTransfer webhook verify errors' },
    )
    this.makeTransferWebhookVerifySuccessCounter = this.data.metrics.getCounter(
      `${prefix}_webhook_verify_success_counter`,
      { description: 'Number of makeTransfer webhook verify success' },
    )
  }

  async getLatestBlockhash(environment: string, index: number): Promise<LatestBlockhashResponse> {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getLatestBlockhash()
  }

  async getMinimumRentExemptionBalance(
    environment: string,
    index: number,
    { dataLength }: MinimumRentExemptionBalanceRequest,
  ): Promise<MinimumRentExemptionBalanceResponse> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const lamports = await solana.getMinimumBalanceForRentExemption(dataLength)

    return { lamports } as MinimumRentExemptionBalanceResponse
  }

  async makeTransfer(input: MakeTransferRequest): Promise<AppTransaction> {
    const solana = await this.data.getSolanaConnection(input.environment, input.index)
    const appEnv = await this.data.getAppByEnvironmentIndex(input.environment, input.index)
    const appKey = this.data.getAppKey(input.environment, input.index)
    this.makeTransferRequestCounter.add(1, { appKey })

    const created = await this.data.appTransaction.create({
      data: {
        appEnvId: appEnv.id,
        commitment: input.commitment,
        referenceId: input.referenceId,
        referenceType: input.referenceType,
      },
      include: { errors: true },
    })
    const mint = appEnv.mints.find(({ mint }) => mint.address === input.mint)
    if (!mint) {
      this.makeTransferMintNotFoundErrorCounter.add(1, { appKey, mint: input.mint.toString() })
      throw new Error(`${appKey}: Can't find mint ${input.mint}`)
    }
    const signer = Keypair.fromSecretKey(mint.wallet?.secretKey)

    const { amount, blockhash, destination, feePayer, source, transaction } = parseAndSignTokenTransfer({
      tx: input.tx,
      signer: signer.solana,
    })

    const appTransaction: Prisma.AppTransactionUpdateInput = {
      amount,
      destination: destination.pubkey.toBase58(),
      feePayer,
      mint: mint?.mint?.address,
      source,
    }

    // Send Verify Webhook
    if (appEnv.webhookVerifyEnabled && appEnv.webhookVerifyUrl) {
      appTransaction.webhookVerifyStart = new Date()
      try {
        await this.sendVerifyWebhook(appEnv, appTransaction, created.id)
        appTransaction.webhookVerifyEnd = new Date()
        this.makeTransferWebhookVerifySuccessCounter.add(1, { appKey })
      } catch (err) {
        appTransaction.webhookVerifyEnd = new Date()
        this.makeTransferWebhookVerifyErrorCounter.add(1, { appKey })
        return this.updateAppTransaction(created.id, {
          ...appTransaction,
          status: AppTransactionStatus.Failed,
          errors: {
            create: parseError(err.response?.data?.message, AppTransactionErrorType.WebhookFailed),
          },
        })
      }
    }

    // Solana Transaction
    appTransaction.solanaStart = new Date()
    try {
      appTransaction.signature = await solana.sendRawTransaction(transaction)
      appTransaction.status = AppTransactionStatus.Committed
      appTransaction.solanaCommitted = new Date()
      this.logger.verbose(`${appKey}: makeTransfer ${appTransaction.status} ${appTransaction.signature}`)
      this.makeTransferSolanaConfirmedCounter.add(1, { appKey })
    } catch (error) {
      this.logger.verbose(`${appKey}: makeTransfer ${appTransaction.status} ${error}`)
      this.makeTransferSolanaErrorCounter.add(1, { appKey })
      return this.updateAppTransaction(created.id, {
        solanaCommitted: new Date(),
        status: AppTransactionStatus.Failed,
        errors: {
          create: parseError(error, error.type, error.instruction),
        },
      })
    }

    // Confirm transaction
    if (appTransaction.signature) {
      this.logger.verbose(`${appKey}: makeTransfer confirming ${input.commitment} ${appTransaction.signature}...`)
      // Start listening for commitment
      await solana.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight: input.lastValidBlockHeight,
          signature: appTransaction.signature as string,
        },
        input.commitment,
      )
      appTransaction.status = AppTransactionStatus.Confirmed
      appTransaction.solanaConfirmed = new Date()
      this.makeTransferSolanaCommittedCounter.add(1, { appKey })
      await this.updateAppTransaction(created.id, {
        ...appTransaction,
      })
      this.logger.verbose(
        `${appKey}: makeTransfer ${appTransaction.status} ${input.commitment} ${appTransaction.signature}`,
      )

      this.confirmSignature(input.environment, input.index, created.id, {
        blockhash,
        signature: appTransaction.signature as string,
        lastValidBlockHeight: input.lastValidBlockHeight,
      })
    }

    // Send Event Webhook
    let webhookEventEnd
    if (appEnv.webhookEventEnabled && appEnv.webhookEventUrl) {
      const updated = await this.updateAppTransaction(created.id, {
        webhookEventStart: new Date(),
      })

      try {
        await this.sendEventWebhook(appEnv, updated, created.id)
        webhookEventEnd = new Date()
        this.makeTransferWebhookEventSuccessCounter.add(1, { appKey })
      } catch (err) {
        webhookEventEnd = new Date()
        this.makeTransferWebhookEventErrorCounter.add(1, { appKey })
        return this.updateAppTransaction(created.id, {
          webhookEventEnd,
          status: AppTransactionStatus.Failed,
          errors: {
            create: parseError(err.response?.data?.message, AppTransactionErrorType.WebhookFailed),
          },
        })
      }
    }

    // Return object
    return this.updateAppTransaction(created.id, { webhookEventEnd })
  }

  updateAppTransaction(id: string, data: Prisma.AppTransactionUpdateInput) {
    return this.data.appTransaction.update({
      where: { id },
      data: { ...data },
      include: { errors: true },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendEventWebhook(appEnv: AppEnv, payload: any, transactionId: string) {
    return this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Event, payload, transactionId })
  }

  sendVerifyWebhook(appEnv: AppEnv, payload: Prisma.AppTransactionUpdateInput, transactionId) {
    return this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Verify, payload, transactionId })
  }

  async confirmSignature(
    environment: string,
    index: number,
    appTransactionId: string,
    {
      blockhash,
      lastValidBlockHeight,
      signature,
    }: {
      blockhash: string
      lastValidBlockHeight: number
      signature: string
    },
  ) {
    const appKey = this.data.getAppKey(environment, index)
    const solana = await this.data.getSolanaConnection(environment, index)
    this.logger.verbose(`${appKey}: confirmSignature: confirming ${signature}`)

    const finalized = await solana.confirmTransaction(
      {
        blockhash,
        lastValidBlockHeight,
        signature: signature as string,
      },
      Commitment.Finalized,
    )
    if (finalized) {
      this.logger.verbose(`${appKey}: confirmSignature: ${Commitment.Finalized} ${signature}`)
      const solanaTransaction = await solana.connection.getParsedTransaction(signature, 'finalized')
      await this.data.appTransaction.update({
        where: { id: appTransactionId },
        data: {
          solanaFinalized: new Date(),
          solanaTransaction: solanaTransaction ? JSON.parse(JSON.stringify(solanaTransaction)) : undefined,
          status: AppTransactionStatus.Finalized,
        },
      })
      this.makeTransferSolanaFinalizedCounter.add(1, { appKey })
      this.logger.verbose(`${appKey}: confirmSignature: finished ${signature}`)
    }
  }
}
