import { Solana } from '@mogami/solana'
import { Configuration } from '../generated'
import { AccountSdk, TransactionSdk } from './feature'
import { ConfigSdk } from './feature/config-sdk'
import { CoreSdk } from './feature/core-sdk'
import { SdkConfig } from './interfaces/sdk-config'

export class Sdk {
  solana: Solana | undefined

  // Config object for exposed generated APIs
  private readonly apiConfig: Configuration

  // Exposed generated APIs
  readonly account: AccountSdk
  readonly core: CoreSdk
  readonly config: ConfigSdk
  readonly transaction: TransactionSdk

  constructor(readonly sdkConfig: SdkConfig) {
    // Create the API Configuration
    this.apiConfig = new Configuration({ basePath: sdkConfig.endpoint })

    // Configure the APIs
    this.account = new AccountSdk(this.apiConfig)
    this.config = new ConfigSdk(this.apiConfig)
    this.core = new CoreSdk(this.apiConfig)
    this.transaction = new TransactionSdk(this.apiConfig)
  }

  get endpoint() {
    return this.sdkConfig.endpoint
  }

  get solanaRpcEndpoint() {
    return this.sdkConfig.solanaRpcEndpoint || 'mainnet-beta'
  }

  async init() {
    try {
      this.solana = new Solana(this.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
    } catch (e) {
      this.sdkConfig?.logger?.error(`Error initializing Server.`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: SdkConfig): Promise<Sdk> {
    const sdk = new Sdk(config)
    try {
      await sdk.init().then(() => config.logger?.log(`SDK Setup done.`))
      return sdk
    } catch (e) {
      config.logger?.error(`Error setting up SDK.`, e)
      throw new Error(`Error setting up SDK.`)
    }
  }
}
