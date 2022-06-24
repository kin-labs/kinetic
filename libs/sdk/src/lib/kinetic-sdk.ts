import { Solana } from '@kin-kinetic/solana'
import { AppTransaction } from '../generated'
import { getSolanaRpcEndpoint } from './helpers'
import { parseKineticSdkConfig } from './helpers/parse-kinetic-sdk-config'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  GetTokenAccountsOptions,
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
    this.sdkConfig.solanaRpcEndpoint = sdkConfig.solanaRpcEndpoint
      ? getSolanaRpcEndpoint(sdkConfig.solanaRpcEndpoint)
      : getSolanaRpcEndpoint(sdkConfig.endpoint)
  }

  get endpoint() {
    return this.sdkConfig.endpoint
  }

  get solanaRpcEndpoint() {
    return this.sdkConfig.solanaRpcEndpoint || 'mainnet-beta'
  }

  requestAirdrop(options: RequestAirdropOptions) {
    return this.internal.requestAirdrop(options)
  }

  getBalance(option: GetBalanceOptions) {
    return this.internal.getBalance(option)
  }

  config() {
    return this.internal.appConfig
  }

  createAccount(options: CreateAccountOptions): Promise<AppTransaction> {
    return this.internal.createAccount(options)
  }

  getExplorerUrl(path: string) {
    return this.internal?.appConfig?.environment?.explorer?.replace(`{path}`, path)
  }

  getHistory(options: GetHistoryOptions) {
    return this.internal.getHistory(options)
  }

  getTokenAccounts(options: GetTokenAccountsOptions) {
    return this.internal.getTokenAccounts(options)
  }

  makeTransfer(options: MakeTransferOptions) {
    return this.internal.makeTransfer(options)
  }

  makeTransferBatch(options: MakeTransferBatchOptions) {
    return this.internal.makeTransferBatch(options)
  }

  tokenAccounts(account: string) {
    console.warn(`[tokenAccounts] Deprecated method, please use getTokenAccounts()`)
    return this.internal.getTokenAccounts({ account })
  }

  async init() {
    try {
      const { app } = await this.internal.getAppConfig(this.sdkConfig.environment, this.sdkConfig.index)
      this.solana = new Solana(this.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
      this.sdkConfig?.logger?.log(
        `KineticSdk: endpoint '${this.sdkConfig.endpoint}', environment '${this.sdkConfig.environment}', index: ${app.index}`,
      )
      return app
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
