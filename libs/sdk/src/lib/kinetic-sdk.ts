import { Solana } from '@kin-kinetic/solana'
import {
  AccountInfo,
  AppConfig,
  BalanceResponse,
  GetTransactionResponse,
  HistoryResponse,
  Transaction,
} from '../generated'
import { NAME, VERSION } from '../version'
import { getSolanaRpcEndpoint } from './helpers'
import { validateKineticSdkConfig } from './helpers/validate-kinetic-sdk-config'
import {
  CloseAccountOptions,
  CreateAccountOptions,
  GetAccountInfoOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  GetKineticTransactionOptions,
  GetTokenAccountsOptions,
  GetTransactionOptions,
  KineticSdkConfig,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  RequestAirdropOptions,
} from './interfaces'
import { KineticSdkInternal } from './kinetic-sdk-internal'
import './kinetic-sdk-polyfills'

export class KineticSdk {
  solana: Solana | undefined

  private readonly internal: KineticSdkInternal

  constructor(readonly sdkConfig: KineticSdkConfig) {
    this.internal = new KineticSdkInternal(sdkConfig)
  }

  get config(): AppConfig | undefined {
    return this.internal.appConfig
  }

  get endpoint(): string {
    return this.sdkConfig.endpoint
  }

  get solanaRpcEndpoint(): string | undefined {
    return this.sdkConfig.solanaRpcEndpoint
  }

  closeAccount(options: CloseAccountOptions): Promise<Transaction> {
    return this.internal.closeAccount(options)
  }

  createAccount(options: CreateAccountOptions): Promise<Transaction> {
    return this.internal.createAccount(options)
  }

  getAccountInfo(option: GetAccountInfoOptions): Promise<AccountInfo> {
    return this.internal.getAccountInfo(option)
  }

  getBalance(option: GetBalanceOptions): Promise<BalanceResponse> {
    return this.internal.getBalance(option)
  }

  getExplorerUrl(path: string): string | undefined {
    return this.internal.getExplorerUrl(path)
  }

  getHistory(options: GetHistoryOptions): Promise<HistoryResponse[]> {
    return this.internal.getHistory(options)
  }

  getKineticTransaction(options: GetKineticTransactionOptions): Promise<Transaction[]> {
    return this.internal.getKineticTransaction(options)
  }

  getTokenAccounts(options: GetTokenAccountsOptions): Promise<string[]> {
    return this.internal.getTokenAccounts(options)
  }

  getTransaction(options: GetTransactionOptions): Promise<GetTransactionResponse> {
    return this.internal.getTransaction(options)
  }

  makeTransfer(options: MakeTransferOptions): Promise<Transaction> {
    return this.internal.makeTransfer(options)
  }

  makeTransferBatch(options: MakeTransferBatchOptions): Promise<Transaction> {
    return this.internal.makeTransferBatch(options)
  }

  requestAirdrop(options: RequestAirdropOptions) {
    return this.internal.requestAirdrop(options)
  }

  async init(): Promise<AppConfig> {
    try {
      this.sdkConfig?.logger?.log(`${NAME}: initializing ${NAME}@${VERSION}`)
      const config = await this.internal.getAppConfig(this.sdkConfig.environment, this.sdkConfig.index)
      this.sdkConfig.solanaRpcEndpoint = this.sdkConfig.solanaRpcEndpoint
        ? getSolanaRpcEndpoint(this.sdkConfig.solanaRpcEndpoint)
        : getSolanaRpcEndpoint(config.environment.cluster.endpoint)

      this.solana = new Solana(this.sdkConfig.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
      this.sdkConfig?.logger?.log(
        `${NAME}: endpoint '${this.sdkConfig.endpoint}', environment '${this.sdkConfig.environment}', index: ${config.app.index}`,
      )
      return config
    } catch (e) {
      console.error(`${NAME}: Error initializing SDK: ${e}`)
      this.sdkConfig?.logger?.error(`Error initializing Server: ${e}`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: KineticSdkConfig): Promise<KineticSdk> {
    const sdk = new KineticSdk(validateKineticSdkConfig(config))
    try {
      return sdk.init().then(() => {
        config.logger?.log(`${NAME}: Setup done.`)
        return sdk
      })
    } catch (e) {
      console.error(`${NAME}: Error setting up Kinetic SDK: ${e}`)
      config.logger?.error(`${NAME}: Error setting up SDK.`, e)
      throw new Error(`${NAME}: Error setting up SDK.`)
    }
  }
}
