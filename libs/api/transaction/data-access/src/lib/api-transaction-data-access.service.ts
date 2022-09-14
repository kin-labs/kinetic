import { ApiCoreDataAccessService, AppEnvironment } from '@kin-kinetic/api/core/data-access'
import { ApiWebhookDataAccessService, WebhookType } from '@kin-kinetic/api/webhook/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment, parseAndSignTokenTransfer, Solana } from '@kin-kinetic/solana'
import { Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import {
  App,
  AppEnv,
  Prisma,
  Transaction,
  TransactionError,
  TransactionErrorType,
  TransactionStatus,
} from '@prisma/client'
import { Transaction as SolanaTransaction } from '@solana/web3.js'
import { Request } from 'express'
import * as requestIp from 'request-ip'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { GetTransactionResponse } from './entities/get-transaction-response.entity'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'
import { parseError } from './helpers/parse-error'

export type TransactionWithErrors = Transaction & { errors: TransactionError[] }

function getExpiredTime(minutes: number) {
  return new Date(new Date().getTime() - minutes * 60_000)
}

@Injectable()
export class ApiTransactionDataAccessService implements OnModuleInit {
  private logger = new Logger(ApiTransactionDataAccessService.name)

  private confirmSignatureFinalizedCounter: Counter
  private confirmTransactionSolanaConfirmedCounter: Counter
  private makeTransferMintNotFoundErrorCounter: Counter
  private markTransactionTimeoutCounter: Counter
  private makeTransferRequestCounter: Counter
  private sendEventWebhookErrorCounter: Counter
  private sendEventWebhookSuccessCounter: Counter
  private sendSolanaTransactionConfirmedCounter: Counter
  private sendSolanaTransactionErrorCounter: Counter
  private sendVerifyWebhookErrorCounter: Counter
  private sendVerifyWebhookSuccessCounter: Counter

  constructor(readonly data: ApiCoreDataAccessService, private readonly webhook: ApiWebhookDataAccessService) {}

  async cleanupStaleTransactions() {
    const stale = await this.getExpiredTransactions()
    if (!stale.length) return
    this.timeoutTransactions(stale.map((item) => item.id)).then((res) => {
      this.logger.verbose(
        `cleanupStaleTransactions set ${stale?.length} stale transactions: ${res.map((item) => item.id)} `,
      )
    })
  }

  private getExpiredTransactions(): Promise<Transaction[]> {
    const expiredMinutes = 5
    const expired = getExpiredTime(expiredMinutes)
    return this.data.transaction.findMany({
      where: {
        status: { notIn: [TransactionStatus.Finalized, TransactionStatus.Failed] },
        updatedAt: { lt: expired },
      },
    })
  }

  private timeoutTransactions(ids: string[]): Promise<Transaction[]> {
    return Promise.all(ids.map((id) => this.timeoutTransaction(id)))
  }

  private timeoutTransaction(id: string): Promise<Transaction> {
    return this.data.transaction.update({
      where: { id: id },
      data: {
        status: TransactionStatus.Failed,
        errors: {
          create: {
            type: TransactionErrorType.Timeout,
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

  validateMint(appEnv: AppEnvironment, appKey: string, inputMint: string) {
    const found = appEnv.mints.find(({ mint }) => mint.address === inputMint)
    if (!found) {
      this.makeTransferMintNotFoundErrorCounter.add(1, { appKey, mint: inputMint.toString() })
      throw new Error(`${appKey}: Can't find mint ${inputMint}`)
    }
    return found
  }

  async makeTransfer(req: Request, input: MakeTransferRequest): Promise<TransactionWithErrors> {
    const { appEnv, appKey } = await this.data.getAppEnvironment(input.environment, input.index)
    this.makeTransferRequestCounter.add(1, { appKey })

    const { ip, ua } = this.validateRequest(appEnv, req)

    const mint = this.validateMint(appEnv, appKey, input.mint)

    // Create the Transaction
    const transaction: TransactionWithErrors = await this.createTransaction({
      appEnvId: appEnv.id,
      commitment: input.commitment,
      ip,
      referenceId: input.referenceId,
      referenceType: input.referenceType,
      ua,
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

    return this.handleTransaction({
      amount,
      appEnv,
      appKey,
      transaction,
      blockhash,
      commitment: input?.commitment,
      decimals: mint?.mint?.decimals,
      destination: destination?.pubkey.toBase58(),
      feePayer,
      headers: req.headers as Record<string, string>,
      lastValidBlockHeight: input?.lastValidBlockHeight,
      mintPublicKey: mint?.mint?.address,
      solanaTransaction,
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
  }: {
    appEnv: AppEnv & { app: App }
    appKey: string
    transaction: Transaction
    amount?: number
    blockhash: string
    commitment: Commitment
    decimals: number
    destination?: string
    feePayer: string
    headers?: Record<string, string>
    lastValidBlockHeight: number
    mintPublicKey: string
    source: string
    solanaTransaction: SolanaTransaction
  }): Promise<TransactionWithErrors> {
    const environment = appEnv.name
    const index = appEnv.app.index
    const solana = await this.data.getSolanaConnection(environment, index)

    // Update Transaction
    const updatedTransaction = await this.updateTransaction(transaction.id, {
      amount: amount?.toString(),
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
        return verifiedTransaction
      }
    }

    // Solana Transaction
    const sent = await this.sendSolanaTransaction(appKey, transaction.id, solana, solanaTransaction)
    if (sent.status === TransactionStatus.Failed) {
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
        transactionId: transaction.id,
        blockhash,
        headers,
        lastValidBlockHeight: lastValidBlockHeight,
        signature: sent.signature as string,
        solanaStart: confirmedTransaction.solanaStart,
        transactionStart: confirmedTransaction.createdAt,
      })

      if (confirmedTransaction.status === TransactionStatus.Failed) {
        return confirmedTransaction
      }
    }

    return sent
  }

  private async confirmSignature({
    appEnv,
    transactionId,
    blockhash,
    headers,
    lastValidBlockHeight,
    signature,
    solanaStart,
    transactionStart,
  }: {
    appEnv: AppEnv & { app: App }
    transactionId: string
    blockhash: string
    headers?: Record<string, string>
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
      const transaction = await this.updateTransaction(transactionId, {
        solanaFinalized,
        solanaFinalizedDuration,
        solanaTransaction: solanaTransaction ? JSON.parse(JSON.stringify(solanaTransaction)) : undefined,
        status: TransactionStatus.Finalized,
        totalDuration,
      })
      this.confirmSignatureFinalizedCounter.add(1, { appKey })
      // Send Event Webhook
      if (appEnv.webhookEventEnabled && appEnv.webhookEventUrl) {
        return this.sendEventWebhook(appKey, appEnv, transaction, headers)
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
        parseError(err.response?.data?.message, TransactionErrorType.WebhookFailed),
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
        parseError(err?.response?.data?.message, TransactionErrorType.WebhookFailed),
      )
    }
  }

  private async sendSolanaTransaction(
    appKey: string,
    transactionId: string,
    solana: Solana,
    solanaTransaction: SolanaTransaction,
  ): Promise<TransactionWithErrors> {
    const solanaStart = new Date()
    try {
      const signature = await solana.sendRawTransaction(solanaTransaction)
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
        parseError(error, error.type, error.instruction),
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

  createTransaction({
    appEnvId,
    commitment,
    ip,
    referenceId,
    referenceType,
    ua,
  }: {
    appEnvId: string
    commitment: Commitment
    ip: string
    referenceId?: string
    referenceType?: string
    ua: string
  }): Promise<TransactionWithErrors> {
    return this.data.transaction.create({
      data: {
        appEnvId,
        commitment,
        ip,
        referenceId,
        referenceType,
        ua,
      },
      include: { errors: true },
    })
  }

  private updateTransaction(id: string, data: Prisma.TransactionUpdateInput): Promise<TransactionWithErrors> {
    return this.data.transaction.update({
      where: { id },
      data,
      include: { errors: true },
    })
  }
}
