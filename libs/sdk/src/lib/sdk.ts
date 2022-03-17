import { Solana } from '@mogami/solana'
import { AccountSdk, TransactionSdk } from './feature'
import { SdkConfig } from './interfaces/sdk-config'

export class Sdk {
  readonly account: AccountSdk
  readonly transaction: TransactionSdk
  solana: Solana | undefined

  constructor(readonly sdkConfig: SdkConfig) {
    this.account = new AccountSdk(sdkConfig)
    this.transaction = new TransactionSdk(sdkConfig)
  }

  get solanaRpcEndpoint() {
    return this.sdkConfig.solanaRpcEndpoint || 'mainnet-beta'
  }

  async init() {
    try {
      this.solana = new Solana(this.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
      this.account.solana = this.solana
      this.transaction.solana = this.solana
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
