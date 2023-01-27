import { ApiCoreDataAccessService, AppEnvironment } from '@kin-kinetic/api/core/data-access'
import { ellipsify, parseAppKey } from '@kin-kinetic/api/core/util'
import { parseTransactionError } from '@kin-kinetic/api/kinetic/util'
import { ApiSolanaDataAccessService } from '@kin-kinetic/api/solana/data-access'
import { ApiWebhookDataAccessService, WebhookType } from '@kin-kinetic/api/webhook/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import {
  BalanceMint,
  Commitment,
  generateCloseAccountTransaction,
  MintAccounts,
  PublicKeyString,
  removeDecimals,
  Solana,
} from '@kin-kinetic/solana'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { App, AppEnv, Prisma, Transaction, TransactionErrorType, TransactionStatus } from '@prisma/client'
import { Transaction as SolanaTransaction } from '@solana/web3.js'
import { Request } from 'express'
import * as requestIp from 'request-ip'
import { CloseAccountRequest } from './dto/close-account-request.dto'
import { AccountInfo } from './entities/account.info'
import { GetTransactionResponse } from './entities/get-transaction-response.entity'
import { HistoryResponse } from './entities/history-response.entity'
import { LatestBlockhashResponse } from './entities/latest-blockhash-response.entity'
import { MinimumRentExemptionBalanceRequest } from './entities/minimum-rent-exemption-balance-request.dto'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'
import { validateCloseAccount } from './helpers/validate-close.account'
import { ProcessTransactionOptions } from './interfaces/process-transaction-options'
import { TransactionWithErrors } from './interfaces/transaction-with-errors'

@Injectable()
export class ApiKineticService implements OnModuleInit {
  private logger = new Logger(ApiKineticService.name)

  private closeAccountRequestCounter: Counter
  private closeAccountRequestInvalidCounter: Counter
  private closeAccountRequestValidCounter: Counter
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
    this.closeAccountRequestCounter = this.data.metrics.getCounter(`api_account_close_account_request`, {
      description: 'Number of closeAccount requests',
    })
    this.closeAccountRequestInvalidCounter = this.data.metrics.getCounter(`api_account_close_account_invalid_request`, {
      description: 'Number of invalid closeAccount requests',
    })
    this.closeAccountRequestValidCounter = this.data.metrics.getCounter(`api_account_close_account_valid_request`, {
      description: 'Number of valid closeAccount requests',
    })
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

  createAppEnvTransaction(appEnvId: string, options: Prisma.TransactionCreateInput): Promise<TransactionWithErrors> {
    return this.data.transaction.create({
      data: {
        appEnv: { connect: { id: appEnvId } },
        ...options,
      },
      include: { errors: true },
    })
  }

  async confirmSignature({
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
  }): Promise<Transaction | undefined> {
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
      return transaction
    }
  }

  deleteSolanaConnection(appKey: string): void {
    return this.solana.deleteConnection(appKey)
  }

  async getAccountInfo(
    appKey: string,
    account: PublicKeyString,
    mint: PublicKeyString,
    commitment: Commitment,
  ): Promise<AccountInfo> {
    const solana = await this.getSolanaConnection(appKey)
    const accountInfo = await solana.getParsedAccountInfo(account, commitment)

    const parsed = accountInfo?.data?.parsed

    const isMint = parsed?.type === 'mint'
    const isTokenAccount = parsed?.type === 'account'

    const owner = isTokenAccount ? parsed.info.owner : null

    const result = {
      account: account.toString(),
      isMint,
      isOwner: false,
      isTokenAccount,
      owner,
      program: accountInfo?.owner?.toString() ?? null,
      tokens: !isMint && !isTokenAccount ? [] : null,
    }

    // We only want to get the token accounts if the account is not a mint or token account
    if (isMint || isTokenAccount) {
      return result
    }

    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
    const appMint = this.validateMint(appEnv, appKey, mint.toString())

    const tokenAccounts = await this.getTokenAccounts(appKey, account, appMint.mint.address, commitment)

    for (const tokenAccount of tokenAccounts ?? []) {
      const info = await solana.getParsedAccountInfo(tokenAccount, commitment)
      const parsed = info?.data?.parsed?.info

      result.tokens.push({
        account: tokenAccount,
        balance: parsed?.tokenAmount?.amount ? removeDecimals(parsed.tokenAmount.amount, appMint.mint.decimals) : null,
        closeAuthority: parsed?.closeAuthority ?? null,
        decimals: appMint.mint.decimals ?? 0,
        mint: appMint.mint.address,
        owner: parsed?.owner ?? null,
      })
    }

    return {
      ...result,
      isOwner: result.tokens.length > 0,
    }
  }

  async getHistory(
    appKey: string,
    account: PublicKeyString,
    mint: PublicKeyString,
    commitment: Commitment,
  ): Promise<HistoryResponse[]> {
    const solana = await this.getSolanaConnection(appKey)

    return this.getTokenAccounts(appKey, account, mint, commitment).then((accounts) =>
      solana.getTokenAccountsHistory(accounts),
    )
  }

  getSolanaConnection(appKey: string): Promise<Solana> {
    return this.solana.getConnection(appKey)
  }

  async handleCloseAccount(
    input: CloseAccountRequest,
    {
      appEnv,
      appKey,
      headers,
      ip,
      ua,
    }: { appKey: string; appEnv: AppEnvironment; headers?: Record<string, string>; ip?: string; ua?: string },
  ): Promise<Transaction> {
    const processingStartedAt = Date.now()
    this.closeAccountRequestCounter.add(1, { appKey })
    const accountInfo = await this.getAccountInfo(appKey, input.account, input.mint, input.commitment)

    try {
      const tokenAccount = validateCloseAccount({
        info: accountInfo,
        mint: input.mint,
        mints: appEnv.mints.map((m) => m.mint?.address),
        wallets: appEnv.wallets.map((w) => w.publicKey),
      })

      this.closeAccountRequestValidCounter.add(1, { appKey })

      const mint = this.validateMint(appEnv, appKey, input.mint)

      const { blockhash, lastValidBlockHeight } = await this.getLatestBlockhash(appKey)

      const signer = Keypair.fromSecret(mint.wallet?.secretKey)

      const { transaction: solanaTransaction } = generateCloseAccountTransaction({
        addMemo: mint.addMemo,
        blockhash,
        index: input.index,
        lastValidBlockHeight,
        reference: input.reference,
        signer: signer.solana,
        tokenAccount: tokenAccount.account,
      })

      return this.processTransaction({
        appEnv,
        appKey,
        blockhash,
        commitment: input.commitment,
        decimals: mint?.mint?.decimals,
        feePayer: tokenAccount.closeAuthority,
        headers,
        ip,
        lastValidBlockHeight,
        mintPublicKey: mint?.mint?.address,
        reference: input.reference,
        processingStartedAt,
        solanaTransaction,
        source: input.account,
        tx: solanaTransaction.serialize().toString('base64'),
        ua,
      })
    } catch (error) {
      this.closeAccountRequestInvalidCounter.add(1, { appKey })
      throw error
    }
  }

  async getKineticTransaction(
    appKey: string,
    { reference, signature }: { signature: string; reference: string },
  ): Promise<TransactionWithErrors[]> {
    if (!reference?.length && !signature?.length) {
      throw new BadRequestException(`${appKey}: Please provide either reference or signature`)
    }
    const { environment, index } = parseAppKey(appKey)

    const found = await this.data.transaction.findMany({
      where: {
        appEnv: {
          app: {
            index,
          },
          name: environment,
        },
        ...(reference && { reference }),
        ...(signature && { signature }),
      },
      include: { errors: true },
    })
    if (!found.length) {
      throw new NotFoundException(`${appKey}: Transaction not found`)
    }
    return found
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

  getMintAccounts(
    appKey: string,
    account: PublicKeyString,
    commitment: Commitment,
    mints: BalanceMint[],
  ): Promise<MintAccounts[]> {
    // Create cache key
    const mintsKey = mints.map((mint) => ellipsify(mint.publicKey, 4, '-')).join(',')

    return this.data.cache.wrap<MintAccounts[]>(
      'solana',
      `${account}:${mintsKey}:${commitment}`,
      async () => {
        // Get token accounts for each mint, gracefully handle errors (e.g. if mint is not found)
        const mintAccounts = await Promise.allSettled(
          mints.map((mint) => this.getMintTokenAccounts(appKey, account, mint, commitment)),
        )

        // Return only fulfilled promises
        return mintAccounts
          .filter((item) => item.status === 'fulfilled')
          .map((item: PromiseFulfilledResult<MintAccounts>) => item.value)
      },
      this.data.config.cache.solana.getTokenAccounts.ttl,
      (value) => !!value.length,
    )
  }

  getMintTokenAccounts(
    appKey: string,
    account: PublicKeyString,
    mint: BalanceMint,
    commitment: Commitment,
  ): Promise<MintAccounts> {
    return this.getTokenAccounts(appKey, account, mint.publicKey, commitment).then((accounts) => ({
      mint,
      accounts,
    }))
  }

  getTokenAccounts(
    appKey: string,
    account: PublicKeyString,
    mint: PublicKeyString,
    commitment: Commitment,
  ): Promise<string[]> {
    return this.data.cache.wrap<string[]>(
      'solana',
      `${appKey}:getTokenAccounts:${account}:${mint}:${commitment}`,
      () => this.getSolanaConnection(appKey).then((solana) => solana.getTokenAccounts(account, mint, commitment)),
      this.data.config.cache.solana.getTokenAccounts.ttl,
      (value) => !!value?.length,
    )
  }

  async getTransaction(appKey: string, signature: string, commitment: Commitment): Promise<GetTransactionResponse> {
    const solana = await this.getSolanaConnection(appKey)

    return solana.getTransaction(signature, commitment)
  }

  async processTransaction({
    amount,
    appEnv,
    appKey,
    blockhash,
    commitment,
    decimals,
    destination,
    feePayer,
    headers,
    ip,
    lastValidBlockHeight,
    mintPublicKey,
    reference,
    processingStartedAt,
    solanaTransaction,
    source,
    tx,
    ua,
  }: ProcessTransactionOptions): Promise<TransactionWithErrors> {
    const solana = await this.solana.getConnection(appKey)

    // Create the transaction and link it to the app environment
    const transaction: TransactionWithErrors = await this.createAppEnvTransaction(appEnv.id, {
      amount: amount ? removeDecimals(amount.toString(), decimals)?.toString() : undefined,
      appKey,
      blockhash,
      commitment,
      decimals,
      destination,
      feePayer,
      headers,
      lastValidBlockHeight,
      ip,
      mint: mintPublicKey,
      reference,
      source,
      tx,
      ua,
      processingDuration: new Date().getTime() - processingStartedAt,
    })

    // Send Verify Webhook and wait for the response before continuing. If the webhook fails, we don't continue
    if (appEnv.webhookVerifyEnabled && appEnv.webhookVerifyUrl) {
      const verifiedTransaction = await this.sendVerifyWebhook(appKey, appEnv, transaction, headers)

      if (verifiedTransaction.status === TransactionStatus.Failed) {
        this.logger.error(
          `Transaction ${transaction.id} sendVerifyWebhook failed:${verifiedTransaction.errors
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

    if (sent.status === TransactionStatus.Failed || !sent.signature) {
      this.logger.error(
        `Transaction ${transaction.id} sendSolanaTransaction failed:${sent.errors.map((e) => e.message).join(', ')}`,
        sent.errors,
      )
      return sent
    }

    // Confirm transaction

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
        `Transaction ${transaction.id} confirmTransaction failed:${confirmedTransaction.errors
          .map((e) => e.message)
          .join(', ')}`,
        confirmedTransaction.errors,
      )
      return confirmedTransaction
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

  // FIXME: Validating the request should be done in a NestJS guard or interceptor
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
