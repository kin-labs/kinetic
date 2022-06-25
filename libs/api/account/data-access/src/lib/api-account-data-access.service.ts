import {
  ApiAppDataAccessService,
  AppTransaction,
  AppTransactionStatus,
  parseError,
} from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { BalanceSummary, Commitment, parseAndSignTransaction, PublicKeyString } from '@kin-kinetic/solana'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { CreateAccountRequest } from './dto/create-account-request.dto'
import { HistoryResponse } from './entities/history.entity'

@Injectable()
export class ApiAccountDataAccessService implements OnModuleInit {
  private createAccountRequestCounter: Counter
  private createAccountErrorMintNotFoundCounter: Counter
  private createAccountSolanaTransactionSuccessCounter: Counter
  private createAccountSolanaTransactionErrorCounter: Counter

  constructor(readonly data: ApiCoreDataAccessService, private readonly app: ApiAppDataAccessService) {}

  onModuleInit() {
    const prefix = 'api_account_create_account'
    this.createAccountRequestCounter = this.data.metrics.getCounter(`${prefix}_request`, {
      description: 'Number of createAccount requests',
    })
    this.createAccountErrorMintNotFoundCounter = this.data.metrics.getCounter(`${prefix}_error_mint_not_found`, {
      description: 'Number of createAccount mint not found errors',
    })
    this.createAccountSolanaTransactionSuccessCounter = this.data.metrics.getCounter(
      `${prefix}_send_solana_transaction_success`,
      {
        description: 'Number of createAccount Solana transaction success',
      },
    )
    this.createAccountSolanaTransactionErrorCounter = this.data.metrics.getCounter(
      `${prefix}_send_solana_transaction_error`,
      {
        description: 'Number of createAccount Solana transaction errors',
      },
    )
  }

  async getAccountInfo(environment: string, index: number, accountId: PublicKeyString, commitment?: Commitment) {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getAccountInfo(accountId, { commitment })
  }

  async getBalance(environment: string, index: number, accountId: PublicKeyString): Promise<BalanceSummary> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)

    const mints = appEnv.mints.map(({ publicKey }) => publicKey)

    return solana.getBalance(accountId, mints)
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

  async createAccount(input: CreateAccountRequest): Promise<AppTransaction> {
    const solana = await this.data.getSolanaConnection(input.environment, input.index)
    const appEnv = await this.data.getAppByEnvironmentIndex(input.environment, input.index)
    const appKey = this.data.getAppKey(input.environment, input.index)
    this.createAccountRequestCounter.add(1, { appKey })

    const created = await this.data.appTransaction.create({
      data: { appEnvId: appEnv.id },
      include: { errors: true },
    })
    const mint = appEnv.mints.find(({ mint }) => mint.address === input.mint)
    if (!mint) {
      this.createAccountErrorMintNotFoundCounter.add(1, { appKey })
      throw new Error(`Can't find mint ${input.mint} in environment ${input.environment} for index ${input.index}`)
    }
    const signer = Keypair.fromSecretKey(mint.wallet?.secretKey)

    const { feePayer, source, transaction } = parseAndSignTransaction({ tx: input.tx, signer: signer.solana })
    let errors

    let status: AppTransactionStatus
    let signature: string

    const solanaStart = new Date()

    try {
      signature = await solana.sendRawTransaction(transaction)
      status = AppTransactionStatus.Committed
      this.createAccountSolanaTransactionSuccessCounter.add(1, { appKey })
    } catch (error) {
      status = AppTransactionStatus.Failed
      this.createAccountSolanaTransactionErrorCounter.add(1, { appKey })
      errors = { create: parseError(error) }
    }

    return this.data.appTransaction.update({
      where: { id: created.id },
      data: {
        errors,
        feePayer,
        mint: mint.mint.address,
        signature,
        solanaStart,
        solanaCommitted: new Date(),
        source,
        status,
      },
      include: { errors: true },
    })
  }
}
