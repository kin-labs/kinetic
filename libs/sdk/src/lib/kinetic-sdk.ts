import { Solana } from '@kin-kinetic/solana'
import { AppConfig, AppTransaction, BalanceResponse, HistoryResponse } from '../generated'
export type { AppConfig, AppTransaction, BalanceResponse, HistoryResponse } from '../generated'
import { getSolanaRpcEndpoint } from './helpers'
import { parseKineticSdkConfig } from './helpers/parse-kinetic-sdk-config'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  GetTokenAccountsOptions,
  GetTransactionOptions,
  KineticSdkConfig,
  KineticSdkConfigParsed,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  RequestAirdropOptions,
} from './interfaces'
import { KineticSdkInternal } from './kinetic-sdk-internal'

export class KineticSdk {
  solana: Solana | undefined

  private readonly internal: KineticSdkInternal

  constructor(readonly sdkConfig: KineticSdkConfigParsed) {
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

  createAccount(options: CreateAccountOptions): Promise<AppTransaction> {
    return this.internal.createAccount(options)
  }

  getBalance(option: GetBalanceOptions): Promise<BalanceResponse> {
    return this.internal.getBalance(option)
  }

  getExplorerUrl(path: string): string | undefined {
    return this.internal?.appConfig?.environment?.explorer?.replace(`{path}`, path)
  }

  getHistory(options: GetHistoryOptions): Promise<HistoryResponse[]> {
    return this.internal.getHistory(options)
  }

  getTokenAccounts(options: GetTokenAccountsOptions): Promise<string[]> {
    return this.internal.getTokenAccounts(options)
  }

  getTransaction({ signature }: GetTransactionOptions) {
    return this.internal.getTransaction({ signature })
  }

  makeTransfer(options: MakeTransferOptions): Promise<AppTransaction> {
    return this.internal.makeTransfer(options)
  }

  makeTransferBatch(options: MakeTransferBatchOptions): Promise<AppTransaction> {
    return this.internal.makeTransferBatch(options)
  }

  requestAirdrop(options: RequestAirdropOptions) {
    return this.internal.requestAirdrop(options)
  }

  async init(): Promise<AppConfig> {
    try {
      const config = await this.internal.getAppConfig(this.sdkConfig.environment, this.sdkConfig.index)
      this.sdkConfig.solanaRpcEndpoint = this.sdkConfig.solanaRpcEndpoint
        ? getSolanaRpcEndpoint(this.sdkConfig.solanaRpcEndpoint)
        : getSolanaRpcEndpoint(config.environment.cluster.endpoint)

      this.solana = new Solana(this.sdkConfig.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
      this.sdkConfig?.logger?.log(
        `KineticSdk: endpoint '${this.sdkConfig.endpoint}', environment '${this.sdkConfig.environment}', index: ${config.app.index}`,
      )
      return config
    } catch (e) {
      this.sdkConfig?.logger?.error(`Error initializing Server.`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: KineticSdkConfig): Promise<KineticSdk> {
    const sdk = new KineticSdk(parseKineticSdkConfig(config))
    try {
      await sdk.init().then(() => config.logger?.log(`KineticSdk: Setup done.`))
      return sdk
    } catch (e) {
      config.logger?.error(`KineticSdk: Error setting up SDK.`, e)
      throw new Error(`KineticSdk: Error setting up SDK.`)
    }
  }
}
