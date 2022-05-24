import { Keypair } from '@mogami/keypair'
import { Payment, PublicKeyString } from '@mogami/solana'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
  Configuration,
  CreateAccountRequest,
  DefaultApi,
  LatestBlockhashResponse,
  MakeTransferRequest,
  TransactionApi,
} from '../generated'
import {
  serializeCreateAccountTransaction,
  serializeMakeTransferTransaction,
  parseMogamiSdkEndpoint,
  serializeMakeTransferBatchTransactions,
} from './helpers'
import { MogamiSdkConfig } from './interfaces'
import { TransactionType } from '@kin-tools/kin-memo'

export class MogamiSdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly appApi: AppApi
  private readonly defaultApi: DefaultApi
  private readonly transactionApi: TransactionApi

  appConfig?: AppConfig

  constructor(readonly sdkConfig: MogamiSdkConfig) {
    // Create the API Configuration
    const apiConfig = new Configuration({ basePath: parseMogamiSdkEndpoint(sdkConfig.endpoint) })

    // Configure the APIs
    this.accountApi = new AccountApi(apiConfig)
    this.airdropApi = new AirdropApi(apiConfig)
    this.appApi = new AppApi(apiConfig)
    this.defaultApi = new DefaultApi(apiConfig)
    this.transactionApi = new TransactionApi(apiConfig)
  }

  balance(accountId: string) {
    return this.accountApi.getBalance(accountId)
  }

  async createAccount(owner: Keypair) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { publicKey: mint, feePayer } = this.appConfig.mint
    const { blockhash: latestBlockhash } = await this.transactionApi
      .getLatestBlockhash()
      .then((res) => res.data as LatestBlockhashResponse)

    const tx = await serializeCreateAccountTransaction({
      mint,
      owner,
      feePayer,
      latestBlockhash,
      appIndex: this.appConfig.app.index,
    })

    const request: CreateAccountRequest = {
      index: this.appConfig.app.index,
      tx,
    }

    const res = await this.accountApi.createAccount(request)

    return Promise.resolve(res.data)
  }

  async getAppConfig(index: number) {
    const res = await this.appApi.getAppConfig(String(index))
    this.appConfig = res.data
    return this.appConfig
  }

  getHistory(accountId: string) {
    return this.accountApi.getHistory(accountId)
  }

  async makeTransfer({
    destination,
    amount,
    owner,
    type,
  }: {
    destination: PublicKeyString
    amount: string
    owner: Keypair
    type: TransactionType
  }) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { publicKey: mint, feePayer } = this.appConfig.mint
    const { blockhash: latestBlockhash } = await this.transactionApi
      .getLatestBlockhash()
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
      index: this.appConfig.app.index,
      tx,
    }

    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  async makeTransferBatch({ payments, owner, type }: { payments: Payment[]; owner: Keypair; type: TransactionType }) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { publicKey: mint, feePayer } = this.appConfig.mint
    const { blockhash: latestBlockhash } = await this.transactionApi
      .getLatestBlockhash()
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
      index: this.appConfig.app.index,
      tx,
    }

    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  requestAirdrop(account: string, amount: string) {
    return this.airdropApi.requestAirdrop({ account, amount })
  }

  tokenAccounts(account: string) {
    return this.accountApi.tokenAccounts(account)
  }
}
