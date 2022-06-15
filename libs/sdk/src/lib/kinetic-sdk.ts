import { Solana } from '@kin-kinetic/solana'
import { Cluster, clusterApiUrl } from '@solana/web3.js'
import { AppTransaction } from '../generated'
import { getSolanaRpcEndpoint } from './helpers'
import { parseKineticSdkConfig } from './helpers/parse-kinetic-sdk-config'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  GetHistoryOptions,
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
      ? clusterApiUrl(getSolanaRpcEndpoint(sdkConfig.solanaRpcEndpoint) as Cluster)
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
        `KineticSdk: endpoint '${this.sdkConfig.endpoint}', environment '${this.sdkConfig.environment}', index: ${app.index}`,
      )
    } catch (e) {
      this.sdkConfig?.logger?.error(`Error initializing Server.`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: KineticSdkConfig): Promise<KineticSdk> {
    const sdk = new KineticSdk(parseKineticSdkConfig(config))
    try {
      await sdk.init().then(() => config.logger?.log(`SDK Setup done.`))
      return sdk
    } catch (e) {
      config.logger?.error(`Error setting up SDK.`, e)
      throw new Error(`Error setting up SDK.`)
    }
  }
}
