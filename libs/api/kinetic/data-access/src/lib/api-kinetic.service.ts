import { ApiCoreDataAccessService, AppEnvironment } from '@kin-kinetic/api/core/data-access'
import { parseTransactionError } from '@kin-kinetic/api/kinetic/util'
import { ApiSolanaDataAccessService } from '@kin-kinetic/api/solana/data-access'
import { ApiWebhookDataAccessService, WebhookType } from '@kin-kinetic/api/webhook/data-access'
import { Commitment, removeDecimals, Solana } from '@kin-kinetic/solana'
import { BadRequestException, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { App, AppEnv, Prisma, Transaction, TransactionErrorType, TransactionStatus } from '@prisma/client'
import { Transaction as SolanaTransaction } from '@solana/web3.js'
import { Request } from 'express'
import * as requestIp from 'request-ip'
import { GetTransactionResponse } from './entities/get-transaction-response.entity'
import { LatestBlockhashResponse } from './entities/latest-blockhash-response.entity'
import { MinimumRentExemptionBalanceRequest } from './entities/minimum-rent-exemption-balance-request.dto'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'
import { ProcessTransactionOptions } from './interfaces/process-transaction-options'
import { TransactionWithErrors } from './interfaces/transaction-with-errors'

@Injectable()
export class ApiKineticService implements OnModuleInit {
  private logger = new Logger(ApiKineticService.name)

  private confirmSignatureFinalizedCounter: Counter
  private confirmTransactionSolanaConfirmedCounter: Counter
  private mintNotFoundErrorCounter: Counter
  private sendEventWebhookErrorCounter: Counter
  private sendEventWebhookSuccessCounter: Counter
  private sendSolanaTransactionConfirmedCounter: Counter
  private sendSolanaTransactionErrorCounter: Counter
  private sendVerifyWebhookErrorCounter: Counter
  private sendVerifyWebhookSuccessCounter: Counter

  constructor(
    private readonly data: ApiCoreDataAccessService,
    private readonly solana: ApiSolanaDataAccessService,
    private readonly webhook: ApiWebhookDataAccessService,
  ) {}

  onModuleInit() {
    this.confirmSignatureFinalizedCounter = this.data.metrics.getCounter(
      `api_kinetic_confirm_signature_finalized_counter`,
      { description: 'Number of makeTransfer finalized Solana transactions' },
    )
    this.confirmTransactionSolanaConfirmedCounter = this.data.metrics.getCounter(
      `api_kinetic_confirm_transaction_solana_confirmed_counter`,
      { description: 'Number of makeTransfer committed Solana transactions' },
    )
    this.mintNotFoundErrorCounter = this.data.metrics.getCounter(`api_kinetic_mint_not_found_error_counter`, {
      description: 'Number of makeTransfer mint not found errors',
    })

    this.sendEventWebhookErrorCounter = this.data.metrics.getCounter(`api_kinetic_send_event_webhook_error_counter`, {
      description: 'Number of makeTransfer webhook event errors',
    })
    this.sendEventWebhookSuccessCounter = this.data.metrics.getCounter(
      `api_kinetic_send_event_webhook_success_counter`,
      { description: 'Number of makeTransfer webhook event success' },
    )
    this.sendSolanaTransactionConfirmedCounter = this.data.metrics.getCounter(
      `api_kinetic_send_solana_transaction_confirmed_counter`,
      { description: 'Number of makeTransfer confirmed Solana transactions' },
    )
    this.sendSolanaTransactionErrorCounter = this.data.metrics.getCounter(
      `api_kinetic_send_solana_transaction_error_counter`,
      { description: 'Number of makeTransfer Solana errors' },
    )
    this.sendVerifyWebhookErrorCounter = this.data.metrics.getCounter(`api_kinetic_send_verify_webhook_error_counter`, {
      description: 'Number of makeTransfer webhook verify errors',
    })
    this.sendVerifyWebhookSuccessCounter = this.data.metrics.getCounter(
      `api_kinetic_send_verify_webhook_success_counter`,
      { description: 'Number of makeTransfer webhook verify success' },
    )
  }

  deleteSolanaConnection(appKey: string): void {
    return this.solana.deleteConnection(appKey)
  }

  getSolanaConnection(appKey: string): Promise<Solana> {
    return this.solana.getConnection(appKey)
  }

  createTransaction({
    appEnvId,
    commitment,
    ip,
    referenceId,
    referenceType,
    tx,
    ua,
  }: {
    appEnvId: string
    commitment: Commitment
    ip: string
    referenceId?: string
    referenceType?: string
    tx?: string
    ua: string
  }): Promise<TransactionWithErrors> {
    return this.data.transaction.create({
      data: {
        appEnvId,
        commitment,
        ip,
        referenceId,
        referenceType,
        tx,
        ua,
      },
      include: { errors: true },
    })
  }

  async getLatestBlockhash(appKey: string): Promise<LatestBlockhashResponse> {
    return this.data.cache.wrap<LatestBlockhashResponse>(
      'solana',
      `${appKey}:getLatestBlockhash`,
      () => this.getSolanaConnection(appKey).then((solana) => solana.getLatestBlockhash()),
      this.data.config.cache.solana.getLatestBlockhash.ttl,
    )
  }

  async getMinimumRentExemptionBalance(
    appKey: string,
    { dataLength }: MinimumRentExemptionBalanceRequest,
  ): Promise<MinimumRentExemptionBalanceResponse> {
    const solana = await this.getSolanaConnection(appKey)
    const lamports = await solana.getMinimumBalanceForRentExemption(dataLength)

    return { lamports } as MinimumRentExemptionBalanceResponse
  }

  async getTransaction(appKey: string, signature: string, commitment: Commitment): Promise<GetTransactionResponse> {
    const solana = await this.getSolanaConnection(appKey)

    return solana.getTransaction(signature, commitment)
  }

  async processTransaction({
    amount,
    appEnv,
    appKey,
    transaction,
    blockhash,
    commitment,
    decimals,
    destination,
    feePayer,
    headers,
    lastValidBlockHeight,
    mintPublicKey,
    solanaTransaction,
    source,
  }: ProcessTransactionOptions): Promise<TransactionWithErrors> {
    const solana = await this.solana.getConnection(appKey)

    // Update Transaction
    const updatedTransaction = await this.updateTransaction(transaction.id, {
      amount: amount ? removeDecimals(amount.toString(), decimals)?.toString() : undefined,
      decimals,
      destination,
      feePayer,
      mint: mintPublicKey,
      processingDuration: new Date().getTime() - transaction.createdAt.getTime(),
      source,
    })

    // Send Verify Webhook
    if (appEnv.webhookVerifyEnabled && appEnv.webhookVerifyUrl) {
      const verifiedTransaction = await this.sendVerifyWebhook(appKey, appEnv, updatedTransaction, headers)
      if (verifiedTransaction.status === TransactionStatus.Failed) {
        this.logger.error(
          `Transaction ${updatedTransaction.id} sendVerifyWebhook failed:${verifiedTransaction.errors
            .map((e) => e.message)
            .join(', ')}`,
          verifiedTransaction.errors,
        )
        return verifiedTransaction
      }
    }

    // Solana Transaction
    const sent = await this.sendSolanaTransaction(appKey, transaction.id, solana, solanaTransaction, {
      maxRetries: appEnv.solanaTransactionMaxRetries ?? 0,
      skipPreflight: appEnv.solanaTransactionSkipPreflight ?? false,
    })
    if (sent.status === TransactionStatus.Failed) {
      this.logger.error(
        `Transaction ${updatedTransaction.id} sendSolanaTransaction failed:${sent.errors
          .map((e) => e.message)
          .join(', ')}`,
        sent.errors,
      )
      return sent
    }

    // Confirm transaction
    if (solanaTransaction.signature) {
      const confirmedTransaction = await this.confirmTransaction(
        appKey,
        blockhash,
        commitment,
        lastValidBlockHeight,
        sent,
        solana,
      )

      this.confirmSignature({
        appEnv,
        appKey,
        transactionId: transaction.id,
        blockhash,
        headers,
        lastValidBlockHeight: lastValidBlockHeight,
        signature: sent.signature as string,
        solanaStart: confirmedTransaction.solanaStart,
        transactionStart: confirmedTransaction.createdAt,
      })

      if (confirmedTransaction.status === TransactionStatus.Failed) {
        this.logger.error(
          `Transaction ${updatedTransaction.id} confirmTransaction failed:${confirmedTransaction.errors
            .map((e) => e.message)
            .join(', ')}`,
          confirmedTransaction.errors,
        )
        return confirmedTransaction
      }
    }

    return sent
  }

  validateMint(appEnv: AppEnvironment, appKey: string, inputMint: string) {
    const found = appEnv.mints.find(({ mint }) => mint.address === inputMint)
    if (!found) {
      this.mintNotFoundErrorCounter.add(1, { appKey, mint: inputMint.toString() })
      throw new BadRequestException(`${appKey}: Can't find mint ${inputMint}`)
    }
    return found
  }

  validateRequest(appEnv: AppEnv, req: Request): { ip: string; ua: string } {
    const ip = requestIp.getClientIp(req)
    const ua = `${req.headers['kinetic-user-agent'] || req.headers['user-agent']}`

    if (appEnv?.ipsAllowed.length > 0 && !appEnv?.ipsAllowed.includes(ip)) {
      throw new UnauthorizedException('Request not allowed')
    }

    if (appEnv?.ipsBlocked.length > 0 && appEnv?.ipsBlocked.includes(ip)) {
      throw new UnauthorizedException('Request not allowed')
    }

    if (appEnv?.uasAllowed.length > 0 && !appEnv?.uasAllowed.includes(ua)) {
      throw new UnauthorizedException('Request not allowed')
    }

    if (appEnv?.uasBlocked.length > 0 && appEnv?.uasBlocked.includes(ua)) {
      throw new UnauthorizedException('Request not allowed')
    }
    return { ip, ua }
  }

  private async confirmSignature({
    appEnv,
    appKey,
    transactionId,
    blockhash,
    headers,
    lastValidBlockHeight,
    signature,
    solanaStart,
    transactionStart,
  }: {
    appEnv: AppEnv & { app: App }
    appKey: string
    transactionId: string
    blockhash: string
    headers?: Record<string, string>
    lastValidBlockHeight: number
    signature: string
    solanaStart: Date
    transactionStart: Date
  }) {
    const solana = await this.solana.getConnection(appKey)
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
      const transaction = await this.updateTransaction(transactionId, {
        solanaFinalized,
        solanaFinalizedDuration,
        solanaTransaction: solanaTransaction ? JSON.parse(JSON.stringify(solanaTransaction)) : undefined,
        status: TransactionStatus.Finalized,
        totalDuration,
      })
      this.confirmSignatureFinalizedCounter.add(1, { appKey })
      // Send Event Webhook
      if (appEnv.webhookEventEnabled && appEnv.webhookEventUrl && transaction) {
        const eventWebhookTransaction = await this.sendEventWebhook(appKey, appEnv, transaction, headers)
        if (eventWebhookTransaction.status === TransactionStatus.Failed) {
          this.logger.error(
            `Transaction ${transaction.id} sendEventWebhook failed:${eventWebhookTransaction.errors
              .map((e) => e.message)
              .join(', ')}`,
            eventWebhookTransaction.errors,
          )
          return eventWebhookTransaction
        }
      }

      this.logger.verbose(`${appKey}: confirmSignature: finished ${signature}`)
    }
  }

  private async sendEventWebhook(
    appKey: string,
    appEnv: AppEnv & { app: App },
    transaction: Transaction,
    headers?: Record<string, string>,
  ): Promise<TransactionWithErrors> {
    const webhookEventStart = new Date()
    try {
      await this.webhook.sendWebhook(appEnv, { type: WebhookType.Event, transaction, headers })
      const webhookEventEnd = new Date()
      const webhookEventDuration = webhookEventEnd?.getTime() - webhookEventStart.getTime()
      this.sendEventWebhookSuccessCounter.add(1, { appKey })
      return this.updateTransaction(transaction.id, { webhookEventStart, webhookEventEnd, webhookEventDuration })
    } catch (err) {
      this.sendEventWebhookErrorCounter.add(1, { appKey })
      const webhookEventEnd = new Date()
      const webhookEventDuration = webhookEventEnd?.getTime() - webhookEventStart.getTime()
      return this.handleTransactionError(
        transaction.id,
        { webhookEventStart, webhookEventEnd, webhookEventDuration },
        {
          type: TransactionErrorType.WebhookFailed,
          logs: [err.toString()],
          message: ` ${err.response?.data?.message ?? err.toString() ?? 'Unknown error'}`,
        },
      )
    }
  }

  private async sendVerifyWebhook(
    appKey: string,
    appEnv: AppEnv & { app: App },
    transaction,
    headers: Record<string, string>,
  ): Promise<TransactionWithErrors> {
    const webhookVerifyStart = new Date()
    try {
      await this.webhook.sendWebhook(appEnv, { type: WebhookType.Verify, transaction, headers })
      const webhookVerifyEnd = new Date()
      const webhookVerifyDuration = webhookVerifyEnd?.getTime() - webhookVerifyStart.getTime()
      this.sendVerifyWebhookSuccessCounter.add(1, { appKey })
      return this.updateTransaction(transaction.id, { webhookVerifyStart, webhookVerifyEnd, webhookVerifyDuration })
    } catch (err) {
      this.sendVerifyWebhookErrorCounter.add(1, { appKey })
      const webhookVerifyEnd = new Date()
      const webhookVerifyDuration = webhookVerifyEnd?.getTime() - webhookVerifyStart.getTime()
      return this.handleTransactionError(
        transaction.id,
        { webhookVerifyStart, webhookVerifyEnd, webhookVerifyDuration },
        {
          type: TransactionErrorType.WebhookFailed,
          logs: [err.toString()],
          message: ` ${err.response?.data?.message ?? err.toString() ?? 'Unknown error'}`,
        },
      )
    }
  }

  private async sendSolanaTransaction(
    appKey: string,
    transactionId: string,
    solana: Solana,
    solanaTransaction: SolanaTransaction,
    { maxRetries, skipPreflight }: { maxRetries: number; skipPreflight: boolean },
  ): Promise<TransactionWithErrors> {
    const solanaStart = new Date()
    try {
      const signature = await solana.sendRawTransaction(solanaTransaction, { maxRetries, skipPreflight })
      const status = TransactionStatus.Committed
      const solanaCommitted = new Date()
      const solanaCommittedDuration = solanaCommitted.getTime() - solanaStart.getTime()
      this.sendSolanaTransactionConfirmedCounter.add(1, { appKey })
      this.logger.verbose(`${appKey}: sendSolanaTransaction ${status} ${signature}`)
      return this.updateTransaction(transactionId, {
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
      return this.handleTransactionError(
        transactionId,
        {
          solanaStart,
          solanaCommitted,
          solanaCommittedDuration,
        },
        parseTransactionError(error, error.type, error.instruction),
      )
    }
  }

  private async handleTransactionError(
    transactionId: string,
    data: Prisma.TransactionUpdateInput,
    error: Prisma.TransactionErrorCreateWithoutTransactionInput,
  ): Promise<TransactionWithErrors> {
    return this.updateTransaction(transactionId, {
      ...data,
      status: TransactionStatus.Failed,
      errors: { create: error },
    })
  }

  private async confirmTransaction(
    appKey: string,
    blockhash: string,
    commitment: Commitment,
    lastValidBlockHeight: number,
    transaction: TransactionWithErrors,
    solana: Solana,
  ): Promise<TransactionWithErrors> {
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
    const status = TransactionStatus.Confirmed
    const solanaConfirmed = new Date()
    this.confirmTransactionSolanaConfirmedCounter.add(1, { appKey })
    this.logger.verbose(`${appKey}: confirmTransaction ${status} ${commitment} ${transaction.signature}`)
    return this.updateTransaction(transaction.id, { status, solanaConfirmed })
  }

  private updateTransaction(id: string, data: Prisma.TransactionUpdateInput): Promise<TransactionWithErrors> {
    return this.data.transaction.update({
      where: { id },
      data,
      include: { errors: true },
    })
  }
}
