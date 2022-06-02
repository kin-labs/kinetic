import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@mogami/keypair'
import { Commitment, Payment, PublicKeyString } from '@mogami/solana'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
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
import { MogamiSdkConfigParsed } from './interfaces/mogami-sdk-config-parsed'
import { MogamiSdkEnvironment } from './interfaces/mogami-sdk-environment'

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

  async balance(accountId: string): Promise<BalanceResponse> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }

    console.log({
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      accountId,
    })
    const res = await this.accountApi.getBalance(this.appConfig.environment.name, this.appConfig.app.index, accountId)

    return res.data as BalanceResponse
  }

  async createAccount(owner: Keypair) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { publicKey: mint, feePayer } = this.appConfig.mint
    const { blockhash: latestBlockhash } = await this.transactionApi
      .getLatestBlockhash(this.appConfig.environment.name, this.appConfig.app.index)
      .then((res) => res.data as LatestBlockhashResponse)

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
    type,
  }: {
    amount: string
    commitment: Commitment
    destination: PublicKeyString
    owner: Keypair
    type: TransactionType
  }) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { publicKey: mint, feePayer } = this.appConfig.mint
    const { blockhash: latestBlockhash, lastValidBlockHeight } = await this.transactionApi
      .getLatestBlockhash(this.appConfig.environment.name, this.appConfig.app.index)
      .then((res) => res.data as LatestBlockhashResponse)

    const tx = await serializeMakeTransferTransaction({
      amount,
      destination,
      mint,
      owner,
      latestBlockhash,
      feePayer,
      appIndex: this.appConfig.app.index,
      type,
    })

    const request: MakeTransferRequest = {
      commitment,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: this.appConfig.mint.symbol,
      lastValidBlockHeight,
      tx,
    }

    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  async makeTransferBatch({
    commitment,
    owner,
    payments,
    type,
  }: {
    commitment: Commitment
    owner: Keypair
    payments: Payment[]
    type: TransactionType
  }) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    if (payments?.length > 15) {
      throw new Error('Maximum number of payments exceeded')
    }

    const { publicKey: mint, feePayer } = this.appConfig.mint
    const { blockhash: latestBlockhash, lastValidBlockHeight } = await this.transactionApi
      .getLatestBlockhash(this.appConfig.environment.name, this.appConfig.app.index)
      .then((res) => res.data as LatestBlockhashResponse)

    const tx = await serializeMakeTransferBatchTransactions({
      payments,
      mint,
      owner,
      latestBlockhash,
      feePayer,
      appIndex: this.appConfig.app.index,
      type,
    })

    const request: MakeTransferRequest = {
      commitment,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: this.appConfig.mint.symbol,
      lastValidBlockHeight,
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
}
