import { TransactionType } from '@kin-tools/kin-memo'
import { Commitment, PublicKeyString } from '@kin-kinetic/solana'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
  AppConfigMint,
  AppTransaction,
  BalanceResponse,
  Configuration,
  CreateAccountRequest,
  DefaultApi,
  LatestBlockhashResponse,
  MakeTransferRequest,
  TransactionApi,
} from '../generated'
import {
  parseKineticSdkEndpoint,
  serializeCreateAccountTransaction,
  serializeMakeTransferBatchTransactions,
  serializeMakeTransferTransaction,
} from './helpers'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  KineticSdkConfigParsed,
  KineticSdkEnvironment,
  RequestAirdropOptions,
  GetTokenAccountsOptions,
} from './interfaces'

export class KineticSdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly appApi: AppApi
  private readonly defaultApi: DefaultApi
  private readonly transactionApi: TransactionApi

  appConfig?: AppConfig

  constructor(readonly sdkConfig: KineticSdkConfigParsed) {
    // Create the API Configuration
    const apiConfig = new Configuration({ basePath: parseKineticSdkEndpoint(sdkConfig.endpoint) })

    // Configure the APIs
    this.accountApi = new AccountApi(apiConfig)
    this.airdropApi = new AirdropApi(apiConfig)
    this.appApi = new AppApi(apiConfig)
    this.defaultApi = new DefaultApi(apiConfig)
    this.transactionApi = new TransactionApi(apiConfig)
  }

  async getBalance({ account }: GetBalanceOptions): Promise<BalanceResponse> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    const res = await this.accountApi.getBalance(
      this.appConfig.environment.name,
      this.appConfig.app.index,
      account.toString(),
    )

    return res.data as BalanceResponse
  }

  async createAccount({ owner, mint }: CreateAccountOptions): Promise<AppTransaction> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    const { mintPublicKey, mintFeePayer, latestBlockhash } = await this.prepareTransaction({ mint })

    const tx = await serializeCreateAccountTransaction({
      appIndex: this.appConfig.app.index,
      latestBlockhash,
      mintFeePayer,
      mintPublicKey,
      owner,
    })

    const request: CreateAccountRequest = {
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: mint.toString(),
      tx,
    }

    const res = await this.accountApi.createAccount(request)

    return Promise.resolve(res.data)
  }

  async getAppConfig(environment: KineticSdkEnvironment, index: number) {
    const res = await this.appApi.getAppConfig(environment, index)
    this.appConfig = res.data
    return this.appConfig
  }

  getHistory({ account, mint }: GetHistoryOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    return this.accountApi.getHistory(
      this.appConfig.environment.name,
      this.appConfig.app.index,
      account.toString(),
      mint.toString(),
    )
  }

  getTokenAccounts({ account, mint }: GetTokenAccountsOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    return this.accountApi.getTokenAccounts(
      this.appConfig.environment.name,
      this.appConfig.app.index,
      account.toString(),
      mint.toString(),
    )
  }

  async makeTransfer({
    amount,
    commitment,
    destination,
    mint,
    owner,
    referenceId,
    referenceType,
    type,
  }: MakeTransferOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    const { mintPublicKey, mintFeePayer, latestBlockhash, lastValidBlockHeight } = await this.prepareTransaction({
      mint,
    })

    const tx = await serializeMakeTransferTransaction({
      amount,
      appIndex: this.appConfig.app.index,
      destination,
      latestBlockhash,
      mintFeePayer,
      mintPublicKey,
      owner,
      type: type || TransactionType.None,
    })

    const request: MakeTransferRequest = {
      commitment: commitment || Commitment.Confirmed,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: mint.toString(),
      lastValidBlockHeight,
      referenceId: referenceId || null,
      referenceType: referenceType || null,
      tx,
    }

    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  async makeTransferBatch({
    commitment,
    destinations,
    mint,
    owner,
    referenceId,
    referenceType,
    type,
  }: MakeTransferBatchOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    if (destinations?.length < 1) {
      throw new Error('At least 1 destination required')
    }
    if (destinations?.length > 15) {
      throw new Error('Maximum number of destinations exceeded')
    }
    mint = mint || this.appConfig.mint.publicKey
    const { mintPublicKey, mintFeePayer, latestBlockhash, lastValidBlockHeight } = await this.prepareTransaction({
      mint,
    })

    const tx = await serializeMakeTransferBatchTransactions({
      appIndex: this.appConfig.app.index,
      destinations,
      latestBlockhash,
      mintFeePayer,
      mintPublicKey,
      owner,
      type: type || TransactionType.None,
    })

    const request: MakeTransferRequest = {
      commitment: commitment || Commitment.Confirmed,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: mint.toString(),
      lastValidBlockHeight,
      referenceId: referenceId || null,
      referenceType: referenceType || null,
      tx,
    }

    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  requestAirdrop({ account, amount, mint }: RequestAirdropOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    return this.airdropApi.requestAirdrop({
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint,
      account: account?.toString(),
      amount,
    })
  }

  private async prepareTransaction({ mint }: { mint?: string }): Promise<{
    mintPublicKey: string
    mintFeePayer: string
    latestBlockhash: string
    lastValidBlockHeight: number
  }> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    const found = this.appConfig.mints.find((item) => item.publicKey === mint)
    if (!found) {
      throw new Error(`Mint not found`)
    }
    const { publicKey: mintPublicKey, feePayer: mintFeePayer } = found
    const { blockhash: latestBlockhash, lastValidBlockHeight } = await this.transactionApi
      .getLatestBlockhash(this.appConfig.environment.name, this.appConfig.app.index)
      .then((res) => res.data as LatestBlockhashResponse)

    return { mintPublicKey, mintFeePayer, latestBlockhash, lastValidBlockHeight }
  }
}
