import { ApiAppWebhookDataAccessService, AppEnv, AppWebhookType, parseError } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment, parseAndSignTokenTransfer, Solana } from '@kin-kinetic/solana'
import { Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
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
import { GetTransactionResponse } from './entities/get-transaction.entity'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'
import { Request } from 'express'

type AppTransactionWithErrors = AppTransaction & { errors: AppTransactionError[] }

function getExpiredTime(minutes: number) {
  return new Date(new Date().getTime() - minutes * 60_000)
}

@Injectable()
export class ApiTransactionDataAccessService implements OnModuleInit {
  private logger = new Logger(ApiTransactionDataAccessService.name)

  private confirmSignatureFinalizedCounter: Counter
  private confirmTransactionSolanaConfirmedCounter: Counter
  private makeTransferMintNotFoundErrorCounter: Counter
  private makeTransferRequestCounter: Counter
  private markTransactionTimeoutCounter: Counter
  private sendEventWebhookErrorCounter: Counter
  private sendEventWebhookSuccessCounter: Counter
  private sendSolanaTransactionConfirmedCounter: Counter
  private sendSolanaTransactionErrorCounter: Counter
  private sendVerifyWebhookErrorCounter: Counter
  private sendVerifyWebhookSuccessCounter: Counter

  constructor(readonly data: ApiCoreDataAccessService, private readonly appWebhook: ApiAppWebhookDataAccessService) {}

  @Cron('* * * * * *')
  async cleanupStaleTransactions() {
    const stale = await this.getExpiredTransactions()
    if (!stale.length) return
    this.timeoutAppTransactions(stale.map((item) => item.id)).then((res) => {
      this.logger.verbose(
        `cleanupStaleTransactions set ${stale?.length} stale transactions: ${res.map((item) => item.id)} `,
      )
    })
  }

  private getExpiredTransactions(): Promise<AppTransaction[]> {
    const expiredMinutes = 5
    const expired = getExpiredTime(expiredMinutes)
    return this.data.appTransaction.findMany({
      where: {
        status: { notIn: [AppTransactionStatus.Finalized, AppTransactionStatus.Failed] },
        updatedAt: { lt: expired },
      },
    })
  }

  private timeoutAppTransactions(ids: string[]): Promise<AppTransaction[]> {
    return Promise.all(ids.map((id) => this.timeoutAppTransaction(id)))
  }

  private timeoutAppTransaction(id: string): Promise<AppTransaction> {
    return this.data.appTransaction.update({
      where: { id: id },
      data: {
        status: AppTransactionStatus.Failed,
        errors: {
          create: {
            type: AppTransactionErrorType.Timeout,
            message: `Transaction timed out`,
          },
        },
      },
    })
  }

  onModuleInit() {
    this.confirmSignatureFinalizedCounter = this.data.metrics.getCounter(
      `api_transaction_confirm_signature_finalized_counter`,
      { description: 'Number of makeTransfer finalized Solana transactions' },
    )
    this.confirmTransactionSolanaConfirmedCounter = this.data.metrics.getCounter(
      `api_transaction_confirm_transaction_solana_confirmed_counter`,
      { description: 'Number of makeTransfer committed Solana transactions' },
    )
    this.makeTransferMintNotFoundErrorCounter = this.data.metrics.getCounter(
      `api_transaction_make_transfer_mint_not_found_error_counter`,
      { description: 'Number of makeTransfer mint not found errors' },
    )
    this.makeTransferRequestCounter = this.data.metrics.getCounter(`api_transaction_make_transfer_request_counter`, {
      description: 'Number of requests to makeTransfer',
    })
    this.markTransactionTimeoutCounter = this.data.metrics.getCounter(
      `api_transaction_mark_transaction_timeout_counter`,
      {
        description: 'Number of transactions that are marked as Timeout',
      },
    )
    this.sendEventWebhookErrorCounter = this.data.metrics.getCounter(
      `api_transaction_send_event_webhook_error_counter`,
      { description: 'Number of makeTransfer webhook event errors' },
    )
    this.sendEventWebhookSuccessCounter = this.data.metrics.getCounter(
      `api_transaction_send_event_webhook_success_counter`,
      { description: 'Number of makeTransfer webhook event success' },
    )
    this.sendSolanaTransactionConfirmedCounter = this.data.metrics.getCounter(
      `api_transaction_send_solana_transaction_confirmed_counter`,
      { description: 'Number of makeTransfer confirmed Solana transactions' },
    )
    this.sendSolanaTransactionErrorCounter = this.data.metrics.getCounter(
      `api_transaction_send_solana_transaction_error_counter`,
      { description: 'Number of makeTransfer Solana errors' },
    )
    this.sendVerifyWebhookErrorCounter = this.data.metrics.getCounter(
      `api_transaction_send_verify_webhook_error_counter`,
      { description: 'Number of makeTransfer webhook verify errors' },
    )
    this.sendVerifyWebhookSuccessCounter = this.data.metrics.getCounter(
      `api_transaction_send_verify_webhook_success_counter`,
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

  async makeTransfer(input: MakeTransferRequest, req: Request): Promise<AppTransactionWithErrors> {
    const { appEnv, appKey } = await this.data.getAppEnvironment(input.environment, input.index)
    this.makeTransferRequestCounter.add(1, { appKey })

    if (appEnv?.ipsBlocked.includes(req.ip)) {
      throw new UnauthorizedException('Request not allowed')
    }

    const mint = appEnv.mints.find(({ mint }) => mint.address === input.mint)
    if (!mint) {
      this.makeTransferMintNotFoundErrorCounter.add(1, { appKey, mint: input.mint.toString() })
      throw new Error(`${appKey}: Can't find mint ${input.mint}`)
    }

    // Create the AppTransaction
    const appTransaction: AppTransactionWithErrors = await this.createAppTransaction({
      appEnvId: appEnv.id,
      commitment: input.commitment,
      ip: req.ip,
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
      appTransaction,
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

  async getTransaction(environment: string, index: number, signature: string): Promise<GetTransactionResponse> {
    const solana = await this.data.getSolanaConnection(environment, index)
    return solana.getTransaction(signature)
  }

  async handleTransaction({
    amount,
    appEnv,
    appKey,
    appTransaction,
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
    appTransaction: AppTransaction
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
    const updatedAppTransaction = await this.updateAppTransaction(appTransaction.id, {
      amount: amount.toString(),
      destination,
      feePayer,
      mint: mintPublicKey,
      processingDuration: new Date().getTime() - appTransaction.createdAt.getTime(),
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
    const solanaAppTransaction = await this.sendSolanaTransaction(appKey, appTransaction.id, solana, solanaTransaction)
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

      this.confirmSignature({
        appEnv,
        appTransactionId: appTransaction.id,
        blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
        signature: solanaAppTransaction.signature as string,
        solanaStart: confirmedAppTransaction.solanaStart,
        transactionStart: confirmedAppTransaction.createdAt,
      })

      if (confirmedAppTransaction.status === AppTransactionStatus.Failed) {
        return confirmedAppTransaction
      }
    }

    return solanaAppTransaction
  }

  private async confirmSignature({
    appEnv,
    appTransactionId,
    blockhash,
    lastValidBlockHeight,
    signature,
    solanaStart,
    transactionStart,
  }: {
    appEnv: AppEnv
    appTransactionId: string
    blockhash: string
    lastValidBlockHeight: number
    signature: string
    solanaStart: Date
    transactionStart: Date
  }) {
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
      const solanaFinalized = new Date()
      const solanaFinalizedDuration = solanaFinalized.getTime() - solanaStart.getTime()
      const totalDuration = solanaFinalized.getTime() - transactionStart.getTime()
      this.logger.verbose(`${appKey}: confirmSignature: ${Commitment.Finalized} ${signature}`)
      const solanaTransaction = await solana.connection.getParsedTransaction(signature, 'finalized')
      const appTransaction = await this.updateAppTransaction(appTransactionId, {
        solanaFinalized,
        solanaFinalizedDuration,
        solanaTransaction: solanaTransaction ? JSON.parse(JSON.stringify(solanaTransaction)) : undefined,
        status: AppTransactionStatus.Finalized,
        totalDuration,
      })
      this.confirmSignatureFinalizedCounter.add(1, { appKey })
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
    const webhookEventStart = new Date()
    try {
      await this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Event, transaction })
      const webhookEventEnd = new Date()
      const webhookEventDuration = webhookEventEnd?.getTime() - webhookEventStart.getTime()
      this.sendEventWebhookSuccessCounter.add(1, { appKey })
      return this.updateAppTransaction(transaction.id, { webhookEventStart, webhookEventEnd, webhookEventDuration })
    } catch (err) {
      this.sendEventWebhookErrorCounter.add(1, { appKey })
      const webhookEventEnd = new Date()
      const webhookEventDuration = webhookEventEnd?.getTime() - webhookEventStart.getTime()
      return this.handleAppTransactionError(
        transaction.id,
        { webhookEventStart, webhookEventEnd, webhookEventDuration },
        parseError(err.response?.data?.message, AppTransactionErrorType.WebhookFailed),
      )
    }
  }

  private async sendVerifyWebhook(
    appKey: string,
    appEnv: AppEnv,
    transaction: AppTransaction,
  ): Promise<AppTransactionWithErrors> {
    const webhookVerifyStart = new Date()
    try {
      await this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Verify, transaction })
      const webhookVerifyEnd = new Date()
      const webhookVerifyDuration = webhookVerifyEnd?.getTime() - webhookVerifyStart.getTime()
      this.sendVerifyWebhookSuccessCounter.add(1, { appKey })
      return this.updateAppTransaction(transaction.id, { webhookVerifyStart, webhookVerifyEnd, webhookVerifyDuration })
    } catch (err) {
      this.sendVerifyWebhookErrorCounter.add(1, { appKey })
      const webhookVerifyEnd = new Date()
      const webhookVerifyDuration = webhookVerifyEnd?.getTime() - webhookVerifyStart.getTime()
      return this.handleAppTransactionError(
        transaction.id,
        { webhookVerifyStart, webhookVerifyEnd, webhookVerifyDuration },
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
    const solanaStart = new Date()
    try {
      const signature = await solana.sendRawTransaction(solanaTransaction)
      const status = AppTransactionStatus.Committed
      const solanaCommitted = new Date()
      const solanaCommittedDuration = solanaCommitted.getTime() - solanaStart.getTime()
      this.sendSolanaTransactionConfirmedCounter.add(1, { appKey })
      this.logger.verbose(`${appKey}: sendSolanaTransaction ${status} ${signature}`)
      return this.updateAppTransaction(appTransactionId, {
        signature,
        status,
        solanaStart,
        solanaCommitted,
        solanaCommittedDuration,
      })
    } catch (error) {
      this.logger.verbose(`${appKey}: sendSolanaTransaction ${error}`)
      this.sendSolanaTransactionErrorCounter.add(1, { appKey })
      const solanaCommitted = new Date()
      const solanaCommittedDuration = solanaCommitted.getTime() - solanaStart.getTime()
      return this.handleAppTransactionError(
        appTransactionId,
        {
          solanaStart,
          solanaCommitted,
          solanaCommittedDuration,
        },
        parseError(error, error.type, error.instruction),
      )
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

    // Start listening for commitment
    await solana.confirmTransaction(
      {
        blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
        signature: transaction.signature as string,
      },
      commitment,
    )
    const status = AppTransactionStatus.Confirmed
    const solanaConfirmed = new Date()
    this.confirmTransactionSolanaConfirmedCounter.add(1, { appKey })
    this.logger.verbose(`${appKey}: confirmTransaction ${status} ${commitment} ${transaction.signature}`)
    return this.updateAppTransaction(transaction.id, { status, solanaConfirmed })
  }

  private createAppTransaction({
    appEnvId,
    commitment,
    ip,
    referenceId,
    referenceType,
  }: {
    appEnvId: string
    commitment: Commitment
    ip: string
    referenceId?: string
    referenceType?: string
  }): Promise<AppTransactionWithErrors> {
    return this.data.appTransaction.create({
      data: {
        appEnvId,
        commitment,
        ip,
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
