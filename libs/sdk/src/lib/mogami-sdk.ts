import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@mogami/keypair'
import { Payment, Solana } from '@mogami/solana'
import { getSolanaRpcEndpoint } from './helpers/get-solana-rpc-endpoint'
import { MogamiSdkConfig } from './interfaces'
import { MogamiSdkInternal } from './mogami-sdk-internal'

export class MogamiSdk {
  solana: Solana | undefined

  private readonly internal: MogamiSdkInternal

  constructor(readonly sdkConfig: MogamiSdkConfig) {
    this.internal = new MogamiSdkInternal(sdkConfig)
    this.sdkConfig.solanaRpcEndpoint = getSolanaRpcEndpoint(sdkConfig.endpoint)
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

  makeTransfer({
    amount,
    destination,
    owner,
    type = TransactionType.None,
  }: {
    amount: string
    destination: string
    owner: Keypair
    type?: TransactionType
  }) {
    return this.internal.makeTransfer({ amount, destination, owner, type })
  }

  makeTransferBatch({
    payments,
    owner,
    type = TransactionType.Earn,
  }: {
    payments: Payment[]
    owner: Keypair
    type?: TransactionType
  }) {
    return this.internal.makeTransferBatch({ payments, owner, type })
  }

  tokenAccounts(account: string) {
    return this.internal.tokenAccounts(account)
  }

  async init() {
    try {
      const { app } = await this.internal.getAppConfig(this.sdkConfig.index)
      this.solana = new Solana(this.solanaRpcEndpoint, { logger: this.sdkConfig?.logger })
      this.sdkConfig?.logger?.log(`MogamiSdk: endpoint '${this.sdkConfig.endpoint}', index: ${app.index}`)
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
