import { Keypair } from '@mogami/keypair'
import { Solana } from '@mogami/solana'
import { SdkConfig } from './interfaces'
import { SdkInternal } from './sdk-internal'

export class Sdk {
  solana: Solana | undefined

  private readonly internal: SdkInternal

  constructor(readonly sdkConfig: SdkConfig) {
    this.internal = new SdkInternal(sdkConfig)
  }

  get endpoint() {
    return this.sdkConfig.endpoint
  }

  get solanaRpcEndpoint() {
    return this.sdkConfig.solanaRpcEndpoint || 'mainnet-beta'
  }

  airdropRequest(account: string, amount: string) {
    return this.internal.airdropRequest(account, amount)
  }

  balance(account: string) {
    return this.internal.balance(account)
  }

  config() {
    return this.internal.config()
  }

  createAccount(kp: Keypair) {
    return this.internal.createAccount(kp)
  }

  history(account: string) {
    return this.internal.history(account)
  }

  submitTransaction({ amount, destination, owner }: { amount: string; destination: string; owner: Keypair }) {
    return this.internal.submitTransaction({ amount, destination, owner })
  }

  tokenAccounts(account: string) {
    return this.internal.tokenAccounts(account)
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
