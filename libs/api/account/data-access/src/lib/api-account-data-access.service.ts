import { ApiAppDataAccessService, AppTransaction, AppTransactionStatus, parseError } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Commitment, parseAndSignTransaction, PublicKeyString } from '@mogami/solana'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { CreateAccountRequest } from './dto/create-account-request.dto'

@Injectable()
export class ApiAccountDataAccessService implements OnModuleInit {
  private appCreateAccountCallCounter: Counter
  private appCreateAccountErrorMintNotFoundCounter: Counter
  private appCreateAccountSendSolanaTransactionSuccessCounter: Counter
  private appCreateAccountSendSolanaTransactionErrorCounter: Counter

  constructor(readonly data: ApiCoreDataAccessService, private readonly app: ApiAppDataAccessService) {}

  onModuleInit() {
    this.appCreateAccountCallCounter = this.data.metrics.getCounter('app_create_account_call_counter', {
      description: 'Total number of createAccount request calls',
    })
    this.appCreateAccountErrorMintNotFoundCounter = this.data.metrics.getCounter(
      'app_create_account_error_mint_not_found_counter',
      {
        description: 'Total number of createAccount mint not found errors',
      },
    )
    this.appCreateAccountSendSolanaTransactionSuccessCounter = this.data.metrics.getCounter(
      'app_create_account_send_solana_transaction_success_counter',
      {
        description: 'Total number of createAccount send Solana transaction success',
      },
    )
    this.appCreateAccountSendSolanaTransactionErrorCounter = this.data.metrics.getCounter(
      'app_create_account_send_solana_transaction_error_counter',
      {
        description: 'Total number of createAccount send Solana transaction error',
      },
    )
  }

  async getAccountInfo(environment: string, index: number, accountId: PublicKeyString, commitment?: Commitment) {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getAccountInfo(accountId, { commitment })
  }

  async getBalance(environment: string, index: number, accountId: PublicKeyString) {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)

    const value = await solana.getBalance(accountId, appEnv.mint.publicKey)

    return { value }
  }

  async getHistory(environment: string, index: number, accountId: PublicKeyString) {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)

    return solana.getTokenHistory(accountId, appEnv.mint.publicKey)
  }

  async getTokenAccounts(environment: string, index: number, accountId: PublicKeyString) {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)

    return solana.getTokenAccounts(accountId, appEnv.mint.publicKey)
  }

  async createAccount(input: CreateAccountRequest): Promise<AppTransaction> {
    const solana = await this.data.getSolanaConnection(input.environment, input.index)
    const appEnv = await this.data.getAppByEnvironmentIndex(input.environment, input.index)
    const appKey = this.data.getAppKey(input.environment, input.index)
    this.appCreateAccountCallCounter.add(1, { appKey })

    const created = await this.data.appTransaction.create({
      data: { appEnvId: appEnv.id },
      include: { errors: true },
    })
    const mint = appEnv.mints.find(({ mint }) => mint.symbol === input.mint)
    if (!mint) {
      this.appCreateAccountErrorMintNotFoundCounter.add(1, { appKey })
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
      this.appCreateAccountSendSolanaTransactionSuccessCounter.add(1, { appKey })
    } catch (error) {
      status = AppTransactionStatus.Failed
      this.appCreateAccountSendSolanaTransactionErrorCounter.add(1, { appKey })
      errors = parseError(error)
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
