import { Keypair } from '@mogami/keypair'
import { PublicKeyString } from '@mogami/solana'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
  ConfigApi,
  Configuration,
  DefaultApi,
  LatestBlockhashResponse,
  TransactionApi,
} from '../generated'
import { serializeCreateAccountTransaction, serializeMakeTransferTransaction } from './helpers'
import { SdkConfig } from './interfaces'

export class SdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly appApi: AppApi
  private readonly configApi: ConfigApi
  private readonly defaultApi: DefaultApi
  private readonly transactionApi: TransactionApi

  private appConfig?: AppConfig

  constructor(readonly sdkConfig: SdkConfig) {
    // Create the API Configuration
    const apiConfig = new Configuration({ basePath: sdkConfig.endpoint })

    // Configure the APIs
    this.accountApi = new AccountApi(apiConfig)
    this.airdropApi = new AirdropApi(apiConfig)
    this.appApi = new AppApi(apiConfig)
    this.configApi = new ConfigApi(apiConfig)
    this.defaultApi = new DefaultApi(apiConfig)
    this.transactionApi = new TransactionApi(apiConfig)
  }

  balance(accountId: string) {
    return this.accountApi.getBalance(accountId)
  }

  config() {
    return this.configApi.config()
  }

  async createAccount(owner: Keypair) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { publicKey: mint, feePayer: subsidizer } = this.appConfig.mint
    const { blockhash: latestBlockhash } = await this.transactionApi
      .getLatestBlockhash()
      .then((res) => res.data as LatestBlockhashResponse)

    const serialized = await serializeCreateAccountTransaction({
      mint,
      owner,
      subsidizer,
      latestBlockhash,
    })

    const res = await this.accountApi.createAccount({ tx: serialized })

    return Promise.resolve({ mint, subsidizer, latestBlockhash, res })
  }

  async getAppConfig(index: number) {
    const res = await this.appApi.getAppConfig(String(index))
    this.appConfig = res.data
    return this.appConfig
  }

  getHistory(accountId: string) {
    return this.accountApi.getHistory(accountId)
  }

  async makeTransfer({ destination, amount, owner }: { destination: PublicKeyString; amount: string; owner: Keypair }) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const { publicKey: mint, feePayer: subsidizer } = this.appConfig.mint
    const { blockhash: latestBlockhash } = await this.transactionApi
      .getLatestBlockhash()
      .then((res) => res.data as LatestBlockhashResponse)

    const serialized = await serializeMakeTransferTransaction({
      amount,
      destination,
      mint,
      owner,
      latestBlockhash,
      subsidizer,
    })

    const res = await this.transactionApi.makeTransfer({ tx: JSON.stringify(serialized) })

    return Promise.resolve({ mint, subsidizer, latestBlockhash, res })
  }

  requestAirdrop(account: string, amount: string) {
    return this.airdropApi.requestAirdrop({ account, amount })
  }

  tokenAccounts(account: string) {
    return this.accountApi.tokenAccounts(account)
  }
}
