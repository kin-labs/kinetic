import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@mogami/keypair'
import { Commitment, Payment, Solana } from '@mogami/solana'
import { getSolanaRpcEndpoint } from './helpers'
import { parseMogamiSdkConfig } from './helpers/parse-mogami-sdk-config'
import { MogamiSdkConfig } from './interfaces'
import { MogamiSdkConfigParsed } from './interfaces/mogami-sdk-config-parsed'
import { MogamiSdkInternal } from './mogami-sdk-internal'

export class MogamiSdk {
  solana: Solana | undefined

  private readonly internal: MogamiSdkInternal

  constructor(readonly sdkConfig: MogamiSdkConfigParsed) {
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
    commitment = Commitment.Confirmed,
    destination,
    owner,
    type = TransactionType.None,
  }: {
    amount: string
    commitment?: Commitment
    destination: string
    owner: Keypair
    type?: TransactionType
  }) {
    return this.internal.makeTransfer({
      amount,
      commitment,
      destination,
      owner,
      type,
    })
  }

  makeTransferBatch({
    commitment = Commitment.Confirmed,
    owner,
    payments,
    type = TransactionType.Earn,
  }: {
    commitment?: Commitment
    owner: Keypair
    payments: Payment[]
    type?: TransactionType
  }) {
    return this.internal.makeTransferBatch({
      commitment,
      owner,
      payments,
      type,
    })
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
