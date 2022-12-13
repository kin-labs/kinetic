import { ApiAppDataAccessService } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService, AppEnvironment } from '@kin-kinetic/api/core/data-access'
import {
  ApiTransactionDataAccessService,
  Transaction,
  TransactionWithErrors,
} from '@kin-kinetic/api/transaction/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import {
  BalanceMint,
  BalanceSummary,
  Commitment,
  generateCloseAccountTransaction,
  getPublicKey,
  parseAndSignTransaction,
  PublicKeyString,
  removeDecimals,
} from '@kin-kinetic/solana'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { Request } from 'express'
import { CloseAccountRequest } from './dto/close-account-request.dto'
import { CreateAccountRequest } from './dto/create-account-request.dto'
import { HistoryResponse } from './entities/history-response.entity'
import { validateCloseAccount } from './helpers/validate-close.account'

@Injectable()
export class ApiAccountDataAccessService implements OnModuleInit {
  private closeAccountRequestCounter: Counter
  private closeAccountRequestInvalidCounter: Counter
  private closeAccountRequestValidCounter: Counter
  private createAccountRequestCounter: Counter
  private createAccountErrorMintNotFoundCounter: Counter
  private createAccountSolanaTransactionSuccessCounter: Counter
  private createAccountSolanaTransactionErrorCounter: Counter

  constructor(
    readonly data: ApiCoreDataAccessService,
    private readonly app: ApiAppDataAccessService,
    private readonly transaction: ApiTransactionDataAccessService,
  ) {}

  onModuleInit() {
    const closePrefix = 'api_account_close_account'
    const createPrefix = 'api_account_create_account'
    this.closeAccountRequestCounter = this.data.metrics.getCounter(`${closePrefix}_request`, {
      description: 'Number of closeAccount requests',
    })
    this.closeAccountRequestInvalidCounter = this.data.metrics.getCounter(`${closePrefix}_invalid_request`, {
      description: 'Number of invalid closeAccount requests',
    })
    this.closeAccountRequestValidCounter = this.data.metrics.getCounter(`${closePrefix}_valid_request`, {
      description: 'Number of valid closeAccount requests',
    })
    this.createAccountRequestCounter = this.data.metrics.getCounter(`${createPrefix}_request`, {
      description: 'Number of createAccount requests',
    })
    this.createAccountErrorMintNotFoundCounter = this.data.metrics.getCounter(`${createPrefix}_error_mint_not_found`, {
      description: 'Number of createAccount mint not found errors',
    })
    this.createAccountSolanaTransactionSuccessCounter = this.data.metrics.getCounter(
      `${createPrefix}_send_solana_transaction_success`,
      {
        description: 'Number of createAccount Solana transaction success',
      },
    )
    this.createAccountSolanaTransactionErrorCounter = this.data.metrics.getCounter(
      `${createPrefix}_send_solana_transaction_error`,
      {
        description: 'Number of createAccount Solana transaction errors',
      },
    )
  }

  async closeAccount(req: Request, input: CloseAccountRequest): Promise<Transaction> {
    const { appEnv, appKey } = await this.data.getAppEnvironment(input.environment, input.index)
    const { ip, ua } = this.transaction.validateRequest(appEnv, req)

    return this.handleCloseAccount(input, { appEnv, appKey, ip, ua })
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
    this.closeAccountRequestCounter.add(1, { appKey })
    const accountInfo = await this.getAccountInfo(input.environment, input.index, input.account)

    try {
      const tokenAccount = validateCloseAccount({
        info: accountInfo,
        mint: input.mint,
        mints: appEnv.mints.map((m) => m.mint?.address),
        wallets: appEnv.wallets.map((w) => w.publicKey),
      })

      this.closeAccountRequestValidCounter.add(1, { appKey })

      const mint = this.transaction.validateMint(appEnv, appKey, input.mint)

      // Create the Transaction
      const transaction: TransactionWithErrors = await this.transaction.createTransaction({
        appEnvId: appEnv.id,
        commitment: input.commitment,
        ip,
        referenceId: input.referenceId,
        referenceType: input.referenceType,
        ua,
      })

      const { blockhash, lastValidBlockHeight } = await this.transaction.getLatestBlockhash(
        input.environment,
        input.index,
      )

      const signer = Keypair.fromSecret(mint.wallet?.secretKey)

      const { transaction: solanaTransaction } = generateCloseAccountTransaction({
        addMemo: mint.addMemo,
        blockhash,
        index: input.index,
        lastValidBlockHeight,
        signer: signer.solana,
        tokenAccount: tokenAccount.account,
      })

      return this.transaction.handleTransaction({
        appEnv,
        appKey,
        blockhash,
        commitment: input.commitment,
        transaction,
        decimals: mint?.mint?.decimals,
        feePayer: tokenAccount.closeAuthority,
        headers,
        lastValidBlockHeight,
        mintPublicKey: mint?.mint?.address,
        solanaTransaction,
        source: input.account,
      })
    } catch (error) {
      this.closeAccountRequestInvalidCounter.add(1, { appKey })
      throw error
    }
  }

  async getAccountInfo(environment: string, index: number, accountId: PublicKeyString) {
    const solana = await this.data.getSolanaConnection(environment, index)
    const account = getPublicKey(accountId)
    const accountInfo = await solana.connection.getParsedAccountInfo(account)

    if (!accountInfo) {
      return null
    }

    const parsed = (accountInfo.value as any)?.data?.parsed

    const isMint = parsed?.type === 'mint'
    const isTokenAccount = parsed?.type === 'account'

    const owner = isTokenAccount ? parsed.info.owner : null

    const result = {
      account: account.toString(),
      isMint,
      isOwner: false,
      isTokenAccount,
      owner,
      program: accountInfo?.value?.owner?.toString() ?? null,
      tokens: !isMint && !isTokenAccount ? [] : null,
    }

    // We only want to get the token accounts if the account is not a mint or token account
    if (isMint || isTokenAccount) {
      return result
    }

    const appEnv = await this.app.getAppConfig(environment, index)
    const mint = appEnv.mint

    const tokenAccounts = await solana.getTokenAccounts(account, mint.publicKey)
    for (const tokenAccount of tokenAccounts) {
      const info = await solana.connection.getParsedAccountInfo(getPublicKey(tokenAccount))
      const parsed = (info.value as any)?.data?.parsed?.info

      result.tokens.push({
        account: tokenAccount,
        balance: parsed?.tokenAmount?.amount ? removeDecimals(parsed.tokenAmount.amount, mint.decimals) : null,
        closeAuthority: parsed?.closeAuthority ?? null,
        decimals: mint.decimals ?? 0,
        mint: mint.publicKey,
        owner: parsed?.owner ?? null,
      })
    }

    return {
      ...result,
      isOwner: result.tokens.length > 0,
    }
  }

  async getBalance(
    environment: string,
    index: number,
    accountId: PublicKeyString,
    commitment: Commitment,
  ): Promise<BalanceSummary> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)

    const mints: BalanceMint[] = appEnv.mints.map(({ decimals, publicKey }) => ({ decimals, publicKey }))

    return solana.getBalance(accountId, mints, commitment)
  }

  async getHistory(
    environment: string,
    index: number,
    accountId: PublicKeyString,
    mint?: PublicKeyString,
  ): Promise<HistoryResponse[]> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)
    mint = mint || appEnv.mint.publicKey

    return solana.getTokenHistory(accountId, mint.toString())
  }

  async getTokenAccounts(
    environment: string,
    index: number,
    accountId: PublicKeyString,
    mint?: PublicKeyString,
  ): Promise<string[]> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)
    mint = mint || appEnv.mint.publicKey

    return solana.getTokenAccounts(accountId, mint.toString())
  }

  async createAccount(req: Request, input: CreateAccountRequest): Promise<Transaction> {
    const { appEnv, appKey } = await this.data.getAppEnvironment(input.environment, input.index)
    this.createAccountRequestCounter.add(1, { appKey })

    const { ip, ua } = this.transaction.validateRequest(appEnv, req)

    const mint = this.transaction.validateMint(appEnv, appKey, input.mint)

    // Create the Transaction
    const transaction: TransactionWithErrors = await this.transaction.createTransaction({
      appEnvId: appEnv.id,
      commitment: input.commitment,
      ip,
      referenceId: input.referenceId,
      referenceType: input.referenceType,
      tx: input.tx,
      ua,
    })

    // Process the Solana transaction
    const signer = Keypair.fromSecret(mint.wallet?.secretKey)

    const {
      blockhash,
      feePayer,
      source,
      transaction: solanaTransaction,
    } = parseAndSignTransaction({
      tx: Buffer.from(input.tx, 'base64'),
      signer: signer.solana,
    })

    return this.transaction.handleTransaction({
      appEnv,
      appKey,
      transaction,
      blockhash,
      commitment: input?.commitment,
      decimals: mint?.mint?.decimals,
      feePayer,
      headers: req.headers as Record<string, string>,
      lastValidBlockHeight: input?.lastValidBlockHeight,
      mintPublicKey: mint?.mint?.address,
      solanaTransaction,
      source,
    })
  }
}
