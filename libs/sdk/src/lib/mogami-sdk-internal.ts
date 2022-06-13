import { TransactionType } from '@kin-tools/kin-memo'
import { Commitment, getPublicKey } from '@mogami/solana'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
  AppTransaction,
  BalanceResponse,
  Configuration,
  CreateAccountRequest,
  DefaultApi,
  LatestBlockhashResponse,
  MakeTransferRequest,
  TransactionApi,
} from '../generated'
import {
  parseMogamiSdkEndpoint,
  serializeCreateAccountTransaction,
  serializeMakeTransferBatchTransactions,
  serializeMakeTransferTransaction,
} from './helpers'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  MogamiSdkConfigParsed,
  MogamiSdkEnvironment,
} from './interfaces'

export class MogamiSdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly appApi: AppApi
  private readonly defaultApi: DefaultApi
  private readonly transactionApi: TransactionApi

  appConfig?: AppConfig

  constructor(readonly sdkConfig: MogamiSdkConfigParsed) {
    // Create the API Configuration
    const apiConfig = new Configuration({ basePath: parseMogamiSdkEndpoint(sdkConfig.endpoint) })

    // Configure the APIs
    this.accountApi = new AccountApi(apiConfig)
    this.airdropApi = new AirdropApi(apiConfig)
    this.appApi = new AppApi(apiConfig)
    this.defaultApi = new DefaultApi(apiConfig)
    this.transactionApi = new TransactionApi(apiConfig)
  }

  async getBalance({ account }: GetBalanceOptions): Promise<BalanceResponse> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const res = await this.accountApi.getBalance(
      this.appConfig.environment.name,
      this.appConfig.app.index,
      account.toString(),
    )

    return res.data as BalanceResponse
  }

  async createAccount({ owner }: CreateAccountOptions): Promise<AppTransaction> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { mint, feePayer, latestBlockhash } = await this.prepareTransaction()

    const tx = await serializeCreateAccountTransaction({
      mint,
      owner,
      feePayer,
      latestBlockhash,
      appIndex: this.appConfig.app.index,
    })

    const request: CreateAccountRequest = {
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: this.appConfig.mint?.symbol,
      tx,
    }

    const res = await this.accountApi.createAccount(request)

    return Promise.resolve(res.data)
  }

  async getAppConfig(environment: MogamiSdkEnvironment, index: number) {
    const res = await this.appApi.getAppConfig(environment, index)
    this.appConfig = res.data
    return this.appConfig
  }

  getHistory(accountId: string) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    return this.accountApi.getHistory(this.appConfig.environment.name, this.appConfig.app.index, accountId)
  }

  async makeTransfer({
    amount,
    commitment,
    destination,
    owner,
    referenceId,
    referenceType,
    type,
  }: MakeTransferOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { mint, feePayer, latestBlockhash, lastValidBlockHeight } = await this.prepareTransaction()

    const tx = await serializeMakeTransferTransaction({
      amount,
      destination,
      mint,
      owner,
      latestBlockhash,
      feePayer,
      appIndex: this.appConfig.app.index,
      type: type || TransactionType.None,
    })

    const request: MakeTransferRequest = {
      commitment: commitment || Commitment.Confirmed,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: this.appConfig.mint.symbol,
      lastValidBlockHeight,
      referenceId: referenceId || null,
      referenceType: referenceType || null,
      tx,
    }

    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  async makeTransferBatch({
    commitment,
    destinations,
    owner,
    referenceId,
    referenceType,
    type,
  }: MakeTransferBatchOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    if (destinations?.length < 1) {
      throw new Error('At least 1 destination required')
    }
    if (destinations?.length > 15) {
      throw new Error('Maximum number of destinations exceeded')
    }

    const { mint, feePayer, latestBlockhash, lastValidBlockHeight } = await this.prepareTransaction()

    const tx = await serializeMakeTransferBatchTransactions({
      destinations,
      mint,
      owner,
      latestBlockhash,
      feePayer,
      appIndex: this.appConfig.app.index,
      type: type || TransactionType.None,
    })

    const request: MakeTransferRequest = {
      commitment: commitment || Commitment.Confirmed,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: this.appConfig.mint.symbol,
      lastValidBlockHeight,
      referenceId: referenceId || null,
      referenceType: referenceType || null,
      tx,
    }

    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  requestAirdrop(account: string, amount: string) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    return this.airdropApi.requestAirdrop({
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: this.appConfig.mint.symbol,
      account,
      amount,
    })
  }

  tokenAccounts(account: string) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    return this.accountApi.tokenAccounts(this.appConfig.environment.name, this.appConfig.app.index, account)
  }

  private async prepareTransaction(): Promise<{
    mint: string
    feePayer: string
    latestBlockhash: string
    lastValidBlockHeight: number
  }> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }

    const { publicKey: mint, feePayer } = this.appConfig.mint
    const { blockhash: latestBlockhash, lastValidBlockHeight } = await this.transactionApi
      .getLatestBlockhash(this.appConfig.environment.name, this.appConfig.app.index)
      .then((res) => res.data as LatestBlockhashResponse)

    return { mint, feePayer, latestBlockhash, lastValidBlockHeight }
  }
}
