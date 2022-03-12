import { Solana } from '@mogami/solana'
import { SdkConfig } from './interfaces/sdk-config'

export class Sdk {
  solana: Solana

  constructor(readonly sdkConfig: SdkConfig) {}

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
