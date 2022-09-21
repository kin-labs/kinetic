import {
  Commitment,
  generateCreateAccountTransaction,
  generateMakeTransferBatchTransaction,
  generateMakeTransferTransaction,
  serializeTransaction,
} from '@kin-kinetic/solana'
import { TransactionType } from '@kin-tools/kin-memo'
import { AxiosRequestConfig } from 'axios'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
  AppConfigMint,
  BalanceResponse,
  Configuration,
  CreateAccountRequest,
  HistoryResponse,
  MakeTransferRequest,
  RequestAirdropResponse,
  Transaction,
  TransactionApi,
} from '../generated'
import { NAME, VERSION } from '../version'
import {
  CreateAccountOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  GetTokenAccountsOptions,
  GetTransactionOptions,
  KineticSdkConfig,
  KineticSdkEnvironment,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  RequestAirdropOptions,
  TransferDestination,
} from './interfaces'

export class KineticSdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly appApi: AppApi
  private readonly transactionApi: TransactionApi

  appConfig?: AppConfig

  constructor(readonly sdkConfig: KineticSdkConfig) {
    // Create the API Configuration
    const apiConfig = new Configuration({
      baseOptions: this.apiBaseOptions(this.sdkConfig.headers),
      basePath: sdkConfig.endpoint,
    })

    // Configure the APIs
    this.accountApi = new AccountApi(apiConfig)
    this.airdropApi = new AirdropApi(apiConfig)
    this.appApi = new AppApi(apiConfig)
    this.transactionApi = new TransactionApi(apiConfig)
  }

  async createAccount(options: CreateAccountOptions): Promise<Transaction> {
    const appConfig = this.ensureAppConfig()
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    const commitment = options.commitment || Commitment.Confirmed

    const { blockhash, lastValidBlockHeight } = await this.getBlockhash()

    const tx = await generateCreateAccountTransaction({
      addMemo: mint.addMemo,
      blockhash,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mintFeePayer: mint.feePayer,
      mintPublicKey: mint.publicKey,
      owner: options.owner.solana,
    })

    const request: CreateAccountRequest = {
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mint: mint.publicKey,
      referenceId: options.referenceId,
      referenceType: options.referenceType,
      tx: serializeTransaction(tx),
    }

    return this.accountApi.createAccount(request).then((res) => res.data)
  }

  async getAppConfig(environment: KineticSdkEnvironment, index: number) {
    const res = await this.appApi.getAppConfig(environment, index)
    this.appConfig = res.data
    return this.appConfig
  }

  async getBalance(options: GetBalanceOptions): Promise<BalanceResponse> {
    return this.accountApi
      .getBalance(this.sdkConfig.environment, this.sdkConfig.index, options.account.toString())
      .then((res) => res.data)
  }

  getHistory(options: GetHistoryOptions): Promise<HistoryResponse[]> {
    const appConfig = this.ensureAppConfig()
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    return this.accountApi
      .getHistory(this.sdkConfig.environment, this.sdkConfig.index, options.account.toString(), mint.publicKey)
      .then((res) => res.data)
  }

  getTokenAccounts(options: GetTokenAccountsOptions): Promise<string[]> {
    const appConfig = this.ensureAppConfig()
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    return this.accountApi
      .getTokenAccounts(this.sdkConfig.environment, this.sdkConfig.index, options.account.toString(), mint.publicKey)
      .then((res) => res.data)
  }

  getTransaction(options: GetTransactionOptions) {
    return this.transactionApi
      .getTransaction(this.sdkConfig.environment, this.sdkConfig.index, options.signature)
      .then((res) => res.data)
  }

  async makeTransfer(options: MakeTransferOptions) {
    const appConfig = this.ensureAppConfig()
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    const commitment = options.commitment || Commitment.Confirmed
    const destination = options.destination.toString()
    const senderCreate = options.senderCreate || false

    this.validateDestination(appConfig, destination)

    const account = await this.getTokenAccounts({ account: destination, mint: mint.publicKey })

    if (!account?.length && !senderCreate) {
      throw new Error(`Destination account doesn't exist.`)
    }

    const { lastValidBlockHeight, blockhash } = await this.getBlockhash()

    const tx = await generateMakeTransferTransaction({
      addMemo: mint.addMemo,
      amount: options.amount,
      blockhash,
      destination,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mintDecimals: mint.decimals,
      mintFeePayer: mint.feePayer,
      mintPublicKey: mint.publicKey,
      owner: options.owner.solana,
      senderCreate: !account?.length && senderCreate,
      type: options.type || TransactionType.None,
    })

    return this.makeTransferRequest({
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mint: mint.publicKey,
      referenceId: options.referenceId,
      referenceType: options.referenceType,
      tx: serializeTransaction(tx),
    })
  }

  async makeTransferBatch(options: MakeTransferBatchOptions) {
    const appConfig = this.ensureAppConfig()
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    const commitment = options.commitment || Commitment.Confirmed
    const destinations = options.destinations
    const referenceId = options.referenceId || null
    const referenceType = options.referenceType || null

    this.validateDestinations(appConfig, destinations)

    const { blockhash, lastValidBlockHeight } = await this.getBlockhash()

    const tx = await generateMakeTransferBatchTransaction({
      addMemo: mint.addMemo,
      blockhash,
      destinations,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mintDecimals: mint.decimals,
      mintFeePayer: mint.feePayer,
      mintPublicKey: mint.publicKey,
      owner: options.owner.solana,
      type: options.type || TransactionType.None,
    })

    return this.makeTransferRequest({
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mint: mint.publicKey,
      referenceId,
      referenceType,
      tx: serializeTransaction(tx),
    })
  }

  requestAirdrop(options: RequestAirdropOptions): Promise<RequestAirdropResponse> {
    const appConfig = this.ensureAppConfig()
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    return this.airdropApi
      .requestAirdrop({
        account: options.account?.toString(),
        amount: options.amount,
        commitment: options.commitment || Commitment.Finalized,
        environment: this.sdkConfig.environment,
        index: this.sdkConfig.index,
        mint: mint.publicKey,
      })
      .then((res) => res.data)
  }

  private apiBaseOptions(headers: Record<string, string> = {}): AxiosRequestConfig {
    return {
      headers: {
        ...headers,
        'kinetic-environment': `${this.sdkConfig.environment}`,
        'kinetic-index': `${this.sdkConfig.index}`,
        'kinetic-user-agent': `${NAME}@${VERSION}`,
      },
    }
  }

  private ensureAppConfig(): AppConfig {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    return this.appConfig
  }

  private getAppMint(appConfig: AppConfig, mint?: string): AppConfigMint {
    mint = mint || appConfig.mint.publicKey
    const found = appConfig.mints.find((item) => item.publicKey === mint)
    if (!found) {
      throw new Error(`Mint not found`)
    }
    return found
  }

  private async getBlockhash(): Promise<{
    blockhash: string
    lastValidBlockHeight: number
  }> {
    const { blockhash, lastValidBlockHeight } = await this.transactionApi
      .getLatestBlockhash(this.sdkConfig.environment, this.sdkConfig.index)
      .then((res) => res.data)

    return { blockhash, lastValidBlockHeight }
  }

  private makeTransferRequest(request: MakeTransferRequest) {
    return this.transactionApi.makeTransfer(request).then((res) => res.data)
  }

  private validateDestination(appConfig: AppConfig, destination: string) {
    if (appConfig.mints.find((mint) => mint.publicKey === destination)) {
      throw new Error(`Transfers to a mint are not allowed.`)
    }
  }

  private validateDestinations(appConfig: AppConfig, destinations: TransferDestination[]) {
    if (destinations?.length < 1) {
      throw new Error('At least 1 destination required')
    }
    if (destinations?.length > 15) {
      throw new Error('Maximum number of destinations exceeded')
    }
    destinations.forEach((transfer) => this.validateDestination(appConfig, transfer.destination?.toString()))
  }
}
