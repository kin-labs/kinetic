import {
  ApiAppWebhookDataAccessService,
  AppEnv,
  AppTransaction,
  AppWebhookType,
  parseError,
} from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment, parseAndSignTokenTransfer, Solana } from '@kin-kinetic/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { AppTransactionError, AppTransactionErrorType, AppTransactionStatus, Prisma } from '@prisma/client'
import { Transaction } from '@solana/web3.js'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'

type AppTransactionWithErrors = AppTransaction & { errors: AppTransactionError[] }

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

  async makeTransfer(input: MakeTransferRequest): Promise<AppTransactionWithErrors> {
    const solana = await this.data.getSolanaConnection(input.environment, input.index)
    const appEnv = await this.data.getAppByEnvironmentIndex(input.environment, input.index)
    const appKey = this.data.getAppKey(input.environment, input.index)
    this.makeTransferRequestCounter.add(1, { appKey })

    const mint = appEnv.mints.find(({ mint }) => mint.address === input.mint)
    if (!mint) {
      this.makeTransferMintNotFoundErrorCounter.add(1, { appKey, mint: input.mint.toString() })
      throw new Error(`${appKey}: Can't find mint ${input.mint}`)
    }

    // Create the AppTransaction
    let appTransaction: AppTransactionWithErrors = await this.createAppTransaction({
      appEnvId: appEnv.id,
      commitment: input.commitment,
      referenceId: input.referenceId,
      referenceType: input.referenceType,
    })

    // Process the Solana transaction
    const signer = Keypair.fromSecretKey(mint.wallet?.secretKey)

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

    // Update AppTransaction
    appTransaction = await this.updateAppTransaction(appTransaction.id, {
      amount: amount.toString(),
      destination: destination.pubkey.toBase58(),
      feePayer,
      mint: mint?.mint?.address,
      source,
    })

    // Send Verify Webhook
    if (appEnv.webhookVerifyEnabled && appEnv.webhookVerifyUrl) {
      appTransaction = await this.sendVerifyWebhook(appKey, appEnv, appTransaction)
      if (appTransaction.status === AppTransactionStatus.Failed) {
        return appTransaction
      }
    }

    // Solana Transaction
    appTransaction = await this.sendSolanaTransaction(appKey, appTransaction, solana, solanaTransaction)
    if (appTransaction.status === AppTransactionStatus.Failed) {
      return appTransaction
    }

    // Confirm transaction
    if (appTransaction.signature) {
      appTransaction = await this.confirmTransaction(
        appKey,
        blockhash,
        input.commitment,
        input.lastValidBlockHeight,
        appTransaction,
        solana,
      )

      if (appTransaction.status !== AppTransactionStatus.Finalized) {
        this.confirmSignature(appEnv.name, appEnv.app.index, appTransaction.id, {
          blockhash,
          signature: appTransaction.signature as string,
          lastValidBlockHeight: input.lastValidBlockHeight,
        })
      }

      if (appTransaction.status === AppTransactionStatus.Failed) {
        return appTransaction
      }
    }

    // Send Event Webhook
    if (appEnv.webhookEventEnabled && appEnv.webhookEventUrl) {
      return this.sendEventWebhook(appKey, appEnv, appTransaction)
    }

    // Return object
    return appTransaction
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

  private async sendEventWebhook(appKey: string, appEnv: AppEnv, transaction: AppTransaction) {
    const input: Prisma.AppTransactionUpdateInput = { webhookEventStart: new Date() }

    try {
      await this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Event, transaction })
      input.webhookEventEnd = new Date()
      this.makeTransferWebhookEventSuccessCounter.add(1, { appKey })
      return this.updateAppTransaction(transaction.id, input)
    } catch (err) {
      input.errors = {
        create: parseError(err.response?.data?.message, AppTransactionErrorType.WebhookFailed),
      }
      input.status = AppTransactionStatus.Failed
      input.webhookEventEnd = new Date()
      this.makeTransferWebhookEventErrorCounter.add(1, { appKey })
      return this.updateAppTransaction(transaction.id, input)
    }
  }

  private async sendVerifyWebhook(
    appKey: string,
    appEnv: AppEnv,
    transaction: AppTransaction,
  ): Promise<AppTransaction & { errors: AppTransactionError[] }> {
    const input: Prisma.AppTransactionUpdateInput = { webhookVerifyStart: new Date() }
    try {
      await this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Verify, transaction })
      input.webhookVerifyEnd = new Date()
      this.makeTransferWebhookVerifySuccessCounter.add(1, { appKey })
      return this.updateAppTransaction(transaction.id, input)
    } catch (err) {
      input.webhookVerifyEnd = new Date()
      this.makeTransferWebhookVerifyErrorCounter.add(1, { appKey })
      return this.updateAppTransaction(transaction.id, {
        ...input,
        status: AppTransactionStatus.Failed,
        errors: {
          create: parseError(err.response?.data?.message, AppTransactionErrorType.WebhookFailed),
        },
      })
    }
  }

  private async sendSolanaTransaction(
    appKey: string,
    appTransaction: AppTransactionWithErrors,
    solana: Solana,
    solanaTransaction: Transaction,
  ) {
    const input: Prisma.AppTransactionUpdateInput = { solanaStart: new Date() }
    try {
      input.signature = await solana.sendRawTransaction(solanaTransaction)
      input.status = AppTransactionStatus.Committed
      input.solanaCommitted = new Date()
      this.logger.verbose(`${appKey}: makeTransfer ${input.status} ${input.signature}`)
      this.makeTransferSolanaConfirmedCounter.add(1, { appKey })
      return this.updateAppTransaction(appTransaction.id, input)
    } catch (error) {
      this.logger.verbose(`${appKey}: makeTransfer ${input.status} ${error}`)
      this.makeTransferSolanaErrorCounter.add(1, { appKey })
      return this.updateAppTransaction(appTransaction.id, {
        solanaCommitted: new Date(),
        status: AppTransactionStatus.Failed,
        errors: {
          create: parseError(error, error.type, error.instruction),
        },
      })
    }
  }

  private async confirmTransaction(
    appKey: string,
    blockhash: string,
    commitment: Commitment,
    lastValidBlockHeight: number,
    transaction: AppTransactionWithErrors,
    solana: Solana,
  ) {
    this.logger.verbose(`${appKey}: makeTransfer confirming ${commitment} ${transaction.signature}...`)
    const input: Prisma.AppTransactionUpdateInput = {}

    // Start listening for commitment
    await solana.confirmTransaction(
      {
        blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
        signature: transaction.signature as string,
      },
      commitment,
    )
    input.status = AppTransactionStatus.Confirmed
    input.solanaConfirmed = new Date()
    this.makeTransferSolanaCommittedCounter.add(1, { appKey })
    this.logger.verbose(`${appKey}: makeTransfer ${transaction.status} ${commitment} ${transaction.signature}`)
    return this.updateAppTransaction(transaction.id, input)
  }

  private createAppTransaction({
    appEnvId,
    commitment,
    referenceId,
    referenceType,
  }: {
    appEnvId: string
    commitment: Commitment
    referenceId?: string
    referenceType?: string
  }) {
    return this.data.appTransaction.create({
      data: {
        appEnvId,
        commitment,
        referenceId,
        referenceType,
      },
      include: { errors: true },
    })
  }

  private updateAppTransaction(id: string, data: Prisma.AppTransactionUpdateInput): Promise<AppTransactionWithErrors> {
    return this.data.appTransaction.update({
      where: { id },
      data,
      include: { errors: true },
    })
  }
}
