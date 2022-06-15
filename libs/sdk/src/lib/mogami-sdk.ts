import { Solana } from '@mogami/solana'
import { Cluster, clusterApiUrl } from '@solana/web3.js'
import { AppTransaction } from '../generated'
import { getSolanaRpcEndpoint } from './helpers'
import { parseMogamiSdkConfig } from './helpers/parse-mogami-sdk-config'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  MogamiSdkConfig,
  MogamiSdkConfigParsed,
  RequestAirdropOptions,
} from './interfaces'
import { MogamiSdkInternal } from './mogami-sdk-internal'

export class MogamiSdk {
  solana: Solana | undefined

  private readonly internal: MogamiSdkInternal

  constructor(readonly sdkConfig: MogamiSdkConfigParsed) {
    this.internal = new MogamiSdkInternal(sdkConfig)
    this.sdkConfig.solanaRpcEndpoint = sdkConfig.solanaRpcEndpoint
      ? clusterApiUrl(getSolanaRpcEndpoint(sdkConfig.solanaRpcEndpoint) as Cluster)
      : getSolanaRpcEndpoint(sdkConfig.endpoint)
  }

  // START DEPRECATED METHODS
  balance(account: string) {
    console.warn(`Deprecated method, please use getBalance()`)
    return this.getBalance({ account })
  }
  // END DEPRECATED METHODS

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

  getHistory(options: GetHistoryOptions) {
    return this.internal.getHistory(options)
  }

  makeTransfer(options: MakeTransferOptions) {
    return this.internal.makeTransfer(options)
  }

  makeTransferBatch(options: MakeTransferBatchOptions) {
    return this.internal.makeTransferBatch(options)
  }

  tokenAccounts(account: string) {
    return this.internal.tokenAccounts(account)
  }

  async init() {
    try {
      const { app } = await this.internal.getAppConfig(this.sdkConfig.environment, this.sdkConfig.index)
      this.solana = new Solana(this.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
      this.sdkConfig?.logger?.log(
        `MogamiSdk: endpoint '${this.sdkConfig.endpoint}', environment '${this.sdkConfig.environment}', index: ${app.index}`,
      )
    } catch (e) {
      this.sdkConfig?.logger?.error(`Error initializing Server.`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: MogamiSdkConfig): Promise<MogamiSdk> {
    const sdk = new MogamiSdk(parseMogamiSdkConfig(config))
    try {
      await sdk.init().then(() => config.logger?.log(`SDK Setup done.`))
      return sdk
    } catch (e) {
      config.logger?.error(`Error setting up SDK.`, e)
      throw new Error(`Error setting up SDK.`)
    }
  }
}
