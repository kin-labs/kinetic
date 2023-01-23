import {
  generateCreateAccountTransaction,
  generateMakeTransferBatchTransaction,
  generateMakeTransferTransaction,
  PublicKeyString,
  serializeTransaction,
  TransactionType,
} from '@kin-kinetic/solana'
import { AxiosRequestConfig } from 'axios'
import {
  AccountApi,
  AirdropApi,
  AppApi,
  AppConfig,
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
import { getAppMint, getTokenAddress } from './helpers'
import {
  CloseAccountOptions,
  CreateAccountOptions,
  GetAccountInfoOptions,
  GetBalanceOptions,
  GetHistoryOptions,
  GetKineticTransactionOptions,
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
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)
    const reference = options.reference || null

    const request: CloseAccountRequest = {
      account: options.account.toString(),
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      mint: appMint.publicKey,
      reference,
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
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)
    const reference = options.reference || null

    const existing = await this.findTokenAccount({
      account: options.owner.publicKey,
      commitment,
      mint: appMint.publicKey,
    })

    if (existing) {
      throw new Error(`Owner ${options.owner.publicKey} already has an account for mint ${appMint.publicKey}.`)
    }

    // Get AssociatedTokenAccount
    const ownerTokenAccount = await getTokenAddress({ account: options.owner.publicKey, mint: appMint.publicKey })

    const { blockhash, lastValidBlockHeight } = await this.getBlockhashAndHeight()

    const tx = await generateCreateAccountTransaction({
      addMemo: appMint.addMemo,
      blockhash,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mintFeePayer: appMint.feePayer,
      mintPublicKey: appMint.publicKey,
      owner: options.owner.solana,
      ownerTokenAccount,
      reference,
    })

    const request: CreateAccountRequest = {
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mint: appMint.publicKey,
      reference,
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
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)

    return this.accountApi
      .getAccountInfo(
        this.sdkConfig.environment,
        this.sdkConfig.index,
        options.account.toString(),
        appMint.publicKey,
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

  getExplorerUrl(path: string): string | undefined {
    return this.appConfig?.environment?.explorer?.replace(`{path}`, path)
  }

  getHistory(options: GetHistoryOptions): Promise<HistoryResponse[]> {
    const appConfig = this.ensureAppConfig()
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)

    return this.accountApi
      .getHistory(
        this.sdkConfig.environment,
        this.sdkConfig.index,
        options.account.toString(),
        appMint.publicKey,
        commitment,
      )
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getKineticTransaction(options: GetKineticTransactionOptions) {
    return this.transactionApi
      .getKineticTransaction(
        this.sdkConfig.environment,
        this.sdkConfig.index,
        options.reference ?? '',
        options.signature ?? '',
      )
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getTokenAccounts(options: GetTokenAccountsOptions): Promise<string[]> {
    const appConfig = this.ensureAppConfig()
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)

    return this.accountApi
      .getTokenAccounts(
        this.sdkConfig.environment,
        this.sdkConfig.index,
        options.account.toString(),
        appMint.publicKey,
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
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)

    const destination = options.destination.toString()
    const senderCreate = options.senderCreate || false
    const reference = options.reference || null

    // We get the token account for the owner
    const ownerTokenAccount = await this.findTokenAccount({
      account: options.owner.publicKey,
      commitment,
      mint: appMint.publicKey,
    })

    // The operation fails if the owner doesn't have a token account for this mint
    if (!ownerTokenAccount) {
      throw new Error(`Owner account doesn't exist for mint ${appMint.publicKey}.`)
    }

    // We get the account info for the destination
    const destinationTokenAccount = await this.findTokenAccount({
      account: destination,
      commitment,
      mint: appMint.publicKey,
    })

    // The operation fails if the destination doesn't have a token account for this mint and senderCreate is not set
    if (!destinationTokenAccount && !senderCreate) {
      throw new Error(`Destination account doesn't exist for mint ${appMint.publicKey}.`)
    }

    // Derive the associated token address if the destination doesn't have a token account for this mint and senderCreate is set
    let senderCreateTokenAccount: PublicKeyString | undefined
    if (!destinationTokenAccount && senderCreate) {
      senderCreateTokenAccount = await getTokenAddress({ account: destination, mint: appMint.publicKey })
    }

    // The operation fails if there is still no destination token account
    if (!destinationTokenAccount && !senderCreateTokenAccount) {
      throw new Error('Destination token account not found.')
    }

    const { lastValidBlockHeight, blockhash } = await this.getBlockhashAndHeight()

    const tx = generateMakeTransferTransaction({
      addMemo: appMint.addMemo,
      amount: options.amount,
      blockhash,
      destination,
      destinationTokenAccount: (destinationTokenAccount?.toString() ?? senderCreateTokenAccount?.toString()) as string,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mintDecimals: appMint.decimals,
      mintFeePayer: appMint.feePayer,
      mintPublicKey: appMint.publicKey,
      owner: options.owner.solana,
      ownerTokenAccount,
      reference,
      senderCreate: senderCreate && !!senderCreateTokenAccount,
      type: options.type || TransactionType.None,
    })

    return this.makeTransferRequest({
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mint: appMint.publicKey,
      reference,
      tx: serializeTransaction(tx),
    }).catch((err) => {
      throw new Error(err?.response?.data?.message ?? 'Unknown error')
    })
  }

  async makeTransferBatch(options: MakeTransferBatchOptions) {
    const appConfig = this.ensureAppConfig()
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)

    const destinations = options.destinations
    const reference = options.reference || null

    if (destinations?.length < 1) {
      throw new Error('At least 1 destination required')
    }

    if (destinations?.length > 15) {
      throw new Error('Maximum number of destinations exceeded')
    }

    // We get the token account for the owner
    const ownerTokenAccount = await this.findTokenAccount({
      account: options.owner.publicKey,
      commitment,
      mint: appMint.publicKey,
    })

    // The operation fails if the owner doesn't have a token account for this mint
    if (!ownerTokenAccount) {
      throw new Error(`Owner account doesn't exist for mint ${appMint.publicKey}.`)
    }

    // Get TokenAccount from destinations, keep track of missing ones
    const nonExistingDestinations: string[] = []
    const destinationInfo: { amount: string; destination?: string }[] = await Promise.all(
      destinations.map(async (item) => {
        const destination = await this.findTokenAccount({
          account: item.destination.toString(),
          commitment,
          mint: appMint.publicKey,
        })
        if (!destination) {
          nonExistingDestinations.push(item.destination.toString())
        }
        return {
          amount: item.amount,
          destination: destination?.toString(),
        }
      }),
    )

    // The operation fails if any of the destinations doesn't have a token account for this mint
    if (nonExistingDestinations.length) {
      throw new Error(
        `Destination accounts ${nonExistingDestinations.sort().join(', ')} have no token account for mint ${
          appMint.publicKey
        }.`,
      )
    }

    const { blockhash, lastValidBlockHeight } = await this.getBlockhashAndHeight()

    const tx = await generateMakeTransferBatchTransaction({
      addMemo: appMint.addMemo,
      blockhash,
      destinations: destinationInfo as TransferDestination[],
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mintDecimals: appMint.decimals,
      mintFeePayer: appMint.feePayer,
      mintPublicKey: appMint.publicKey,
      owner: options.owner.solana,
      ownerTokenAccount,
      type: options.type || TransactionType.None,
    })

    return this.makeTransferRequest({
      commitment,
      environment: this.sdkConfig.environment,
      index: this.sdkConfig.index,
      lastValidBlockHeight,
      mint: appMint.publicKey,
      reference,
      tx: serializeTransaction(tx),
    }).catch((err) => {
      throw new Error(err?.response?.data?.message ?? 'Unknown error')
    })
  }

  requestAirdrop(options: RequestAirdropOptions): Promise<RequestAirdropResponse> {
    const appConfig = this.ensureAppConfig()
    const appMint = getAppMint(appConfig, options.mint?.toString())
    const commitment = this.getCommitment(options.commitment)

    return this.airdropApi
      .requestAirdrop({
        account: options.account?.toString(),
        amount: options.amount,
        commitment,
        environment: this.sdkConfig.environment,
        index: this.sdkConfig.index,
        mint: appMint.publicKey,
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

  private async findTokenAccount({
    account,
    commitment,
    mint,
  }: {
    account: string
    commitment: Commitment
    mint: string
  }): Promise<string | undefined> {
    // We get the account info for the account
    const accountInfo = await this.getAccountInfo({ account, commitment, mint })

    // The operation fails when the account is a mint account
    if (accountInfo.isMint) {
      throw new Error(`Account is a mint account.`)
    }

    // Find the token account for this mint
    // FIXME: we need to support the use case where the account has multiple accounts for this mint
    return accountInfo?.tokens?.find((t) => t.mint === mint)?.account
  }

  private async getBlockhashAndHeight(): Promise<{
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
}
