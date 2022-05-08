import { Keypair } from '@mogami/keypair'
import { Solana } from '@mogami/solana'
import { MogamiSdkConfig } from './interfaces'
import { MogamiSdkInternal } from './mogami-sdk-internal'

export class MogamiSdk {
  solana: Solana | undefined

  private readonly internal: MogamiSdkInternal

  constructor(readonly sdkConfig: MogamiSdkConfig) {
    this.internal = new MogamiSdkInternal(sdkConfig)
  }

  get endpoint() {
    return this.sdkConfig.endpoint
  }

  get solanaRpcEndpoint() {
    return this.sdkConfig.solanaRpcEndpoint || 'mainnet-beta'
  }

  requestAirdrop(account: string, amount: string) {
    return this.internal.requestAirdrop(account, amount)
  }

  balance(account: string) {
    return this.internal.balance(account)
  }

  config() {
    return this.internal.appConfig
  }

  createAccount(owner: Keypair) {
    return this.internal.createAccount(owner)
  }

  getHistory(account: string) {
    return this.internal.getHistory(account)
  }

  makeTransfer({ amount, destination, owner }: { amount: string; destination: string; owner: Keypair }) {
    return this.internal.makeTransfer({ amount, destination, owner })
  }

  tokenAccounts(account: string) {
    return this.internal.tokenAccounts(account)
  }

  async init() {
    try {
      await this.internal.getAppConfig(this.sdkConfig.index)
      this.solana = new Solana(this.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
    } catch (e) {
      this.sdkConfig?.logger?.error(`Error initializing Server.`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: MogamiSdkConfig): Promise<MogamiSdk> {
    const sdk = new MogamiSdk(config)
    try {
      await sdk.init().then(() => config.logger?.log(`SDK Setup done.`))
      return sdk
    } catch (e) {
      config.logger?.error(`Error setting up SDK.`, e)
      throw new Error(`Error setting up SDK.`)
    }
  }
}
