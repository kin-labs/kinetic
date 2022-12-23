import {
  generateCreateAccountTransaction,
  generateMakeTransferBatchTransaction,
  generateMakeTransferTransaction,
  serializeTransaction,
  TransactionType,
} from '@kin-kinetic/solana'
import { AxiosRequestConfig } from 'axios'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
  AppConfigMint,
  BalanceResponse,
  CloseAccountRequest,
  Commitment,
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
  CloseAccountOptions,
  CreateAccountOptions,
  GetAccountInfoOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  GetTokenAccountsOptions,
  GetTransactionOptions,
  KineticSdkConfig,
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

  async closeAccount(options: CloseAccountOptions): Promise<Transaction> {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    const request: CloseAccountRequest = {
      account: options.account.toString(),
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      mint: mint.publicKey,
      referenceId: options.referenceId,
      referenceType: options.referenceType,
    }

    return this.accountApi
      .closeAccount(request)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  async createAccount(options: CreateAccountOptions): Promise<Transaction> {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    const accounts = await this.getTokenAccounts({ account: options.owner.publicKey, mint: mint.publicKey })
    if (accounts?.length) {
      throw new Error(`Owner ${options.owner.publicKey} already has an account for mint ${mint.publicKey}.`)
    }

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

    return this.accountApi
      .createAccount(request)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getAccountInfo(options: GetAccountInfoOptions) {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    return this.accountApi
      .getAccountInfo(
        this.sdkConfig.environment,
        this.sdkConfig.index,
        options.account.toString(),
        mint.publicKey,
        commitment,
      )
      .then((res) => res.data)
  }

  async getAppConfig(environment: string, index: number) {
    return this.appApi
      .getAppConfig(environment, index)
      .then((res) => res.data)
      .then((appConfig) => {
        this.appConfig = appConfig
        return this.appConfig
      })
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  async getBalance(options: GetBalanceOptions): Promise<BalanceResponse> {
    const commitment = this.getCommitment(options.commitment)
    return this.accountApi
      .getBalance(this.sdkConfig.environment, this.sdkConfig.index, options.account.toString(), commitment)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getHistory(options: GetHistoryOptions): Promise<HistoryResponse[]> {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    return this.accountApi
      .getHistory(
        this.sdkConfig.environment,
        this.sdkConfig.index,
        options.account.toString(),
        mint.publicKey,
        commitment,
      )
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getTokenAccounts(options: GetTokenAccountsOptions): Promise<string[]> {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    return this.accountApi
      .getTokenAccounts(
        this.sdkConfig.environment,
        this.sdkConfig.index,
        options.account.toString(),
        mint.publicKey,
        commitment,
      )
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getTransaction(options: GetTransactionOptions) {
    const commitment = this.getCommitment(options.commitment)

    return this.transactionApi
      .getTransaction(this.sdkConfig.environment, this.sdkConfig.index, options.signature, commitment)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  async makeTransfer(options: MakeTransferOptions) {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    const destination = options.destination.toString()
    const senderCreate = options.senderCreate || false

    this.validateDestination(appConfig, destination)

    const accounts = await this.getTokenAccounts({ account: destination, mint: mint.publicKey })

    if (!accounts?.length && !senderCreate) {
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
      senderCreate: !accounts?.length && senderCreate,
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
    }).catch((err) => {
      throw new Error(err?.response?.data?.message ?? 'Unknown error')
    })
  }

  async makeTransferBatch(options: MakeTransferBatchOptions) {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

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
    }).catch((err) => {
      throw new Error(err?.response?.data?.message ?? 'Unknown error')
    })
  }

  requestAirdrop(options: RequestAirdropOptions): Promise<RequestAirdropResponse> {
    const appConfig = this.ensureAppConfig()
    const commitment = this.getCommitment(options.commitment)
    const mint = this.getAppMint(appConfig, options.mint?.toString())

    return this.airdropApi
      .requestAirdrop({
        account: options.account?.toString(),
        amount: options.amount,
        commitment,
        environment: this.sdkConfig.environment,
        index: this.sdkConfig.index,
        mint: mint.publicKey,
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
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

  private getCommitment(commitment?: Commitment): Commitment {
    return commitment || this.sdkConfig.commitment || Commitment.Confirmed
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
