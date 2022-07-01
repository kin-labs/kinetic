import {
  Commitment,
  serializeCreateAccountTransaction,
  serializeMakeTransferBatchTransactions,
  serializeMakeTransferTransaction,
} from '@kin-kinetic/solana'
import { TransactionType } from '@kin-tools/kin-memo'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
  AppTransaction,
  BalanceResponse,
  Configuration,
  CreateAccountRequest,
  HistoryResponse,
  LatestBlockhashResponse,
  MakeTransferRequest,
  RequestAirdropResponse,
  TransactionApi,
} from '../generated'
import { parseKineticSdkEndpoint } from './helpers'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  GetTokenAccountsOptions,
  KineticSdkConfigParsed,
  KineticSdkEnvironment,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  RequestAirdropOptions,
} from './interfaces'

export class KineticSdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly appApi: AppApi
  private readonly transactionApi: TransactionApi

  appConfig?: AppConfig

  constructor(readonly sdkConfig: KineticSdkConfigParsed) {
    // Create the API Configuration
    const apiConfig = new Configuration({ basePath: parseKineticSdkEndpoint(sdkConfig.endpoint) })

    // Configure the APIs
    this.accountApi = new AccountApi(apiConfig)
    this.airdropApi = new AirdropApi(apiConfig)
    this.appApi = new AppApi(apiConfig)
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
    const { lastValidBlockHeight, latestBlockhash, mintFeePayer, mintPublicKey } = await this.prepareTransaction({
      mint,
    })

    const tx = await serializeCreateAccountTransaction({
      appIndex: this.appConfig.app.index,
      lastValidBlockHeight,
      latestBlockhash,
      mintFeePayer,
      mintPublicKey,
      owner,
    })

    const request: CreateAccountRequest = {
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      mint: mint.toString(),
      tx: tx.toString('base64'),
    }

    const res = await this.accountApi.createAccount(request)

    return Promise.resolve(res.data)
  }

  async getAppConfig(environment: KineticSdkEnvironment, index: number) {
    const res = await this.appApi.getAppConfig(environment, index)
    this.appConfig = res.data
    return this.appConfig
  }

  getHistory({ account, mint }: GetHistoryOptions): Promise<HistoryResponse[]> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    return this.accountApi
      .getHistory(this.appConfig.environment.name, this.appConfig.app.index, account.toString(), mint.toString())
      .then((res) => res.data)
  }

  getTokenAccounts({ account, mint }: GetTokenAccountsOptions): Promise<string[]> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    return this.accountApi
      .getTokenAccounts(this.appConfig.environment.name, this.appConfig.app.index, account.toString(), mint.toString())
      .then((res) => res.data)
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
    senderCreate,
  }: MakeTransferOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    const { lastValidBlockHeight, latestBlockhash, mintDecimals, mintFeePayer, mintPublicKey } =
      await this.prepareTransaction({
        mint,
      })

    const account = await this.getTokenAccounts({ account: destination, mint })

    const tx = await serializeMakeTransferTransaction({
      amount,
      appIndex: this.appConfig.app.index,
      destination,
      lastValidBlockHeight,
      latestBlockhash,
      mintDecimals,
      mintFeePayer,
      mintPublicKey,
      owner,
      type: type || TransactionType.None,
      senderCreate: account?.length === 0 && senderCreate,
    })

    return this.makeTransferRequest({
      commitment: commitment || Commitment.Confirmed,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      lastValidBlockHeight,
      mint: mint.toString(),
      referenceId: referenceId || null,
      referenceType: referenceType || null,
      tx: tx.toString('base64'),
    })
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
    const { mintDecimals, mintPublicKey, mintFeePayer, latestBlockhash, lastValidBlockHeight } =
      await this.prepareTransaction({
        mint,
      })

    const tx = await serializeMakeTransferBatchTransactions({
      appIndex: this.appConfig.app.index,
      destinations,
      lastValidBlockHeight,
      latestBlockhash,
      mintDecimals,
      mintFeePayer,
      mintPublicKey,
      owner,
      type: type || TransactionType.None,
    })

    return this.makeTransferRequest({
      commitment: commitment || Commitment.Confirmed,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      lastValidBlockHeight,
      mint: mint.toString(),
      referenceId: referenceId || null,
      referenceType: referenceType || null,
      tx: tx.toString('base64'),
    })
  }

  async makeTransferRequest(request: MakeTransferRequest) {
    const res = await this.transactionApi.makeTransfer(request)

    return Promise.resolve(res.data)
  }

  requestAirdrop({ account, amount, commitment, mint }: RequestAirdropOptions): Promise<RequestAirdropResponse> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    commitment = commitment || Commitment.Finalized
    return this.airdropApi
      .requestAirdrop({
        account: account?.toString(),
        amount,
        commitment,
        environment: this.appConfig.environment.name,
        index: this.appConfig.app.index,
        mint,
      })
      .then((res) => res.data)
  }

  private async prepareTransaction({ mint }: { mint?: string }): Promise<{
    mintDecimals: number
    mintFeePayer: string
    mintPublicKey: string
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
    const { decimals: mintDecimals, publicKey: mintPublicKey, feePayer: mintFeePayer } = found
    const { blockhash: latestBlockhash, lastValidBlockHeight } = await this.transactionApi
      .getLatestBlockhash(this.appConfig.environment.name, this.appConfig.app.index)
      .then((res) => res.data as LatestBlockhashResponse)

    return { latestBlockhash, lastValidBlockHeight, mintDecimals, mintFeePayer, mintPublicKey }
  }
}
