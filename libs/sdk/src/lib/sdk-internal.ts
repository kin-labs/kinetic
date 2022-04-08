import { Keypair } from '@mogami/keypair'
import { PublicKeyString } from '@mogami/solana'
import {
  AccountApi,
  AirdropApi,
  ConfigApi,
  Configuration,
  DefaultApi,
  RecentBlockhashResponse,
  ServiceConfigResponse,
  TransactionApi,
} from '../generated'
import { serializeCreateAccountTransaction, serializeMakeTransferTransaction } from './helpers'
import { SdkConfig } from './interfaces'

export class SdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly configApi: ConfigApi
  private readonly defaultApi: DefaultApi
  private readonly transactionApi: TransactionApi

  constructor(readonly sdkConfig: SdkConfig) {
    // Create the API Configuration
    const apiConfig = new Configuration({ basePath: sdkConfig.endpoint })

    // Configure the APIs
    this.airdropApi = new AirdropApi(apiConfig)
    this.accountApi = new AccountApi(apiConfig)
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
    const [{ mint, subsidizer }, { blockhash: recentBlockhash }] = await Promise.all([
      this.transactionApi.getServiceConfig().then((res) => res.data as ServiceConfigResponse),
      this.transactionApi.getRecentBlockhash().then((res) => res.data as RecentBlockhashResponse),
    ])

    const serialized = serializeCreateAccountTransaction({
      mint,
      owner,
      subsidizer,
      recentBlockhash,
    })

    const res = await this.accountApi.createAccount({ tx: JSON.stringify(serialized) })

    return Promise.resolve({ mint, subsidizer, recentBlockhash, res })
  }

  getHistory(accountId: string) {
    return this.accountApi.getHistory(accountId)
  }

  async makeTransfer({ destination, amount, owner }: { destination: PublicKeyString; amount: string; owner: Keypair }) {
    const [{ mint, subsidizer }, { blockhash: recentBlockhash }] = await Promise.all([
      this.transactionApi.getServiceConfig().then((res) => res.data as ServiceConfigResponse),
      this.transactionApi.getRecentBlockhash().then((res) => res.data as RecentBlockhashResponse),
    ])

    const serialized = serializeMakeTransferTransaction({
      amount,
      destination,
      mint,
      owner,
      recentBlockhash,
      subsidizer,
    })

    const res = await this.transactionApi.makeTransfer({ tx: JSON.stringify(serialized) })

    return Promise.resolve({ mint, subsidizer, recentBlockhash, res })
  }

  requestAirdrop(account: string, amount: string) {
    return this.airdropApi.requestAirdrop({ account, amount })
  }

  tokenAccounts(account: string) {
    return this.accountApi.tokenAccounts(account)
  }
}
