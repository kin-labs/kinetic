import { ApiAppWebhookDataAccessService, AppEnv, AppWebhookType, parseError } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment, parseAndSignTokenTransfer, Solana } from '@kin-kinetic/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import {
  AppTransaction,
  AppTransactionError,
  AppTransactionErrorType,
  AppTransactionStatus,
  Prisma,
} from '@prisma/client'
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
    const { appEnv, appKey } = await this.data.getAppEnvironment(input.environment, input.index)
    this.makeTransferRequestCounter.add(1, { appKey })

    const mint = appEnv.mints.find(({ mint }) => mint.address === input.mint)
    if (!mint) {
      this.makeTransferMintNotFoundErrorCounter.add(1, { appKey, mint: input.mint.toString() })
      throw new Error(`${appKey}: Can't find mint ${input.mint}`)
    }

    // Create the AppTransaction
    const appTransaction: AppTransactionWithErrors = await this.createAppTransaction({
      appEnvId: appEnv.id,
      commitment: input.commitment,
      referenceId: input.referenceId,
      referenceType: input.referenceType,
    })

    // Process the Solana transaction
    const signer = Keypair.fromSecretKey(mint.wallet?.secretKey)

    const { amount, blockhash, destination, feePayer, source, transaction } = parseAndSignTokenTransfer({
      tx: Buffer.from(input.tx, 'base64'),
      signer: signer.solana,
    })

    return this.handleTransaction({
      amount,
      appEnv,
      appKey,
      appTransactionId: appTransaction.id,
      blockhash,
      commitment: input?.commitment,
      destination: destination?.pubkey.toBase58(),
      feePayer,
      lastValidBlockHeight: input?.lastValidBlockHeight,
      mintPublicKey: mint?.mint?.address,
      solanaTransaction: transaction,
      source,
    })
  }

  async handleTransaction({
    amount,
    appEnv,
    appKey,
    appTransactionId,
    blockhash,
    commitment,
    destination,
    feePayer,
    lastValidBlockHeight,
    mintPublicKey,
    solanaTransaction,
    source,
  }: {
    appEnv: AppEnv
    appKey: string
    appTransactionId: string
    amount: number
    blockhash: string
    commitment: Commitment
    destination: string
    feePayer: string
    lastValidBlockHeight: number
    mintPublicKey: string
    source: string
    solanaTransaction: Transaction
  }): Promise<AppTransactionWithErrors> {
    const environment = appEnv.name
    const index = appEnv.app.index
    const solana = await this.data.getSolanaConnection(environment, index)

    // Update AppTransaction
    const updatedAppTransaction = await this.updateAppTransaction(appTransactionId, {
      amount: amount.toString(),
      destination,
      feePayer,
      mint: mintPublicKey,
      source,
    })

    // Send Verify Webhook
    if (appEnv.webhookVerifyEnabled && appEnv.webhookVerifyUrl) {
      const verifiedAppTransaction = await this.sendVerifyWebhook(appKey, appEnv, updatedAppTransaction)
      if (verifiedAppTransaction.status === AppTransactionStatus.Failed) {
        return verifiedAppTransaction
      }
    }

    // Solana Transaction
    const solanaAppTransaction = await this.sendSolanaTransaction(appKey, appTransactionId, solana, solanaTransaction)
    if (solanaAppTransaction.status === AppTransactionStatus.Failed) {
      return solanaAppTransaction
    }

    // Confirm transaction
    if (solanaAppTransaction.signature) {
      const confirmedAppTransaction = await this.confirmTransaction(
        appKey,
        blockhash,
        commitment,
        lastValidBlockHeight,
        solanaAppTransaction,
        solana,
      )

      this.confirmSignature(appEnv, appTransactionId, {
        blockhash,
        signature: solanaAppTransaction.signature as string,
        lastValidBlockHeight: lastValidBlockHeight,
      })

      if (confirmedAppTransaction.status === AppTransactionStatus.Failed) {
        return confirmedAppTransaction
      }
    }

    // Return object
    return solanaAppTransaction
  }

  private async confirmSignature(
    appEnv: AppEnv,
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
    const environment = appEnv.name
    const index = appEnv.app.index
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
      const appTransaction = await this.updateAppTransaction(appTransactionId, {
        solanaFinalized: new Date(),
        solanaTransaction: solanaTransaction ? JSON.parse(JSON.stringify(solanaTransaction)) : undefined,
        status: AppTransactionStatus.Finalized,
      })
      this.makeTransferSolanaFinalizedCounter.add(1, { appKey })
      // Send Event Webhook
      if (appEnv.webhookEventEnabled && appEnv.webhookEventUrl) {
        return this.sendEventWebhook(appKey, appEnv, appTransaction)
      }

      this.logger.verbose(`${appKey}: confirmSignature: finished ${signature}`)
    }
  }

  private async sendEventWebhook(
    appKey: string,
    appEnv: AppEnv,
    transaction: AppTransaction,
  ): Promise<AppTransactionWithErrors> {
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
      this.makeTransferWebhookEventErrorCounter.add(1, { appKey })
      input.webhookEventEnd = new Date()
      return this.handleAppTransactionError(
        transaction.id,
        input,
        parseError(err.response?.data?.message, AppTransactionErrorType.WebhookFailed),
      )
    }
  }

  private async sendVerifyWebhook(
    appKey: string,
    appEnv: AppEnv,
    transaction: AppTransaction,
  ): Promise<AppTransactionWithErrors> {
    const input: Prisma.AppTransactionUpdateInput = { webhookVerifyStart: new Date() }
    try {
      await this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Verify, transaction })
      input.webhookVerifyEnd = new Date()
      this.makeTransferWebhookVerifySuccessCounter.add(1, { appKey })
      return this.updateAppTransaction(transaction.id, input)
    } catch (err) {
      this.makeTransferWebhookVerifyErrorCounter.add(1, { appKey })
      input.webhookVerifyEnd = new Date()
      return this.handleAppTransactionError(
        transaction.id,
        input,
        parseError(err.response?.data?.message, AppTransactionErrorType.WebhookFailed),
      )
    }
  }

  private async sendSolanaTransaction(
    appKey: string,
    appTransactionId: string,
    solana: Solana,
    solanaTransaction: Transaction,
  ): Promise<AppTransactionWithErrors> {
    const input: Prisma.AppTransactionUpdateInput = { solanaStart: new Date() }
    try {
      input.signature = await solana.sendRawTransaction(solanaTransaction)
      input.status = AppTransactionStatus.Committed
      input.solanaCommitted = new Date()
      this.logger.verbose(`${appKey}: sendSolanaTransaction ${input.status} ${input.signature}`)
      this.makeTransferSolanaConfirmedCounter.add(1, { appKey })
      return this.updateAppTransaction(appTransactionId, input)
    } catch (error) {
      this.logger.verbose(`${appKey}: sendSolanaTransaction ${input.status} ${error}`)
      this.makeTransferSolanaErrorCounter.add(1, { appKey })
      input.solanaCommitted = new Date()
      return this.handleAppTransactionError(appTransactionId, input, parseError(error, error.type, error.instruction))
    }
  }

  private async handleAppTransactionError(
    appTransactionId: string,
    data: Prisma.AppTransactionUpdateInput,
    error: Prisma.AppTransactionErrorCreateWithoutAppTransactionInput,
  ): Promise<AppTransactionWithErrors> {
    return this.updateAppTransaction(appTransactionId, {
      ...data,
      status: AppTransactionStatus.Failed,
      errors: { create: error },
    })
  }

  private async confirmTransaction(
    appKey: string,
    blockhash: string,
    commitment: Commitment,
    lastValidBlockHeight: number,
    transaction: AppTransactionWithErrors,
    solana: Solana,
  ): Promise<AppTransactionWithErrors> {
    this.logger.verbose(`${appKey}: confirmTransaction confirming ${commitment} ${transaction.signature}...`)
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
    this.logger.verbose(`${appKey}: confirmTransaction ${transaction.status} ${commitment} ${transaction.signature}`)
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
  }): Promise<AppTransactionWithErrors> {
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
