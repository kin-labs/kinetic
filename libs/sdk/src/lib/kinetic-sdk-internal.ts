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
  Transaction,
  BalanceResponse,
  Configuration,
  CreateAccountRequest,
  HistoryResponse,
  LatestBlockhashResponse,
  MakeTransferRequest,
  RequestAirdropResponse,
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
} from './interfaces'

export class KineticSdkInternal {
  private readonly accountApi: AccountApi
  private readonly airdropApi: AirdropApi
  private readonly appApi: AppApi
  private readonly transactionApi: TransactionApi

  appConfig?: AppConfig

  private requestConfig(headers: Record<string, string> = {}): AxiosRequestConfig {
    return {
      headers: {
        ...headers,
        'kinetic-environment': `${this.appConfig?.environment?.name}`,
        'kinetic-index': `${this.appConfig?.app?.index}`,
        'kinetic-user-agent': `${NAME}@${VERSION}`,
      },
    }
  }

  constructor(readonly sdkConfig: KineticSdkConfig) {
    // Create the API Configuration
    const apiConfig = new Configuration({
      baseOptions: this.requestConfig(this.sdkConfig.headers),
      basePath: sdkConfig.endpoint,
    })

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

  async createAccount({
    commitment,
    mint,
    owner,
    referenceId,
    referenceType,
  }: CreateAccountOptions): Promise<Transaction> {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    mint = mint || this.appConfig.mint.publicKey
    const { lastValidBlockHeight, latestBlockhash, mintFeePayer, mintPublicKey } = await this.prepareTransaction({
      mint,
    })

    const tx = await generateCreateAccountTransaction({
      addMemo: this.appConfig.mint.addMemo,
      appIndex: this.appConfig.app.index,
      lastValidBlockHeight,
      latestBlockhash,
      mintFeePayer,
      mintPublicKey,
      signer: owner.solana,
    })

    const request: CreateAccountRequest = {
      commitment: commitment || Commitment.Confirmed,
      environment: this.appConfig.environment.name,
      index: this.appConfig.app.index,
      lastValidBlockHeight,
      mint: mint.toString(),
      referenceId: referenceId || null,
      referenceType: referenceType || null,
      tx: serializeTransaction(tx),
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

  getTransaction({ signature }: GetTransactionOptions) {
    if (!this.appConfig) {
      throw new Error(`AppConfig not initialized`)
    }
    return this.transactionApi
      .getTransaction(this.appConfig.environment.name, this.appConfig.app.index, signature)
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

    console.log('-- mint --')
    console.log(this.appConfig.mint)
    console.log('-- mints --')
    console.log(this.appConfig.mints)
    if (this.appConfig.mints.find((mint) => mint.publicKey === destination)) {
      throw new Error(`Transfers to a mint are not allowed.`)
    }

    mint = mint || this.appConfig.mint.publicKey
    const { lastValidBlockHeight, latestBlockhash, mintDecimals, mintFeePayer, mintPublicKey } =
      await this.prepareTransaction({
        mint,
      })

    const account = await this.getTokenAccounts({ account: destination, mint })

    if (!account?.length && !senderCreate) {
      throw new Error(`Destination account doesn't exist.`)
    }

    const tx = await generateMakeTransferTransaction({
      addMemo: this.appConfig.mint.addMemo,
      amount,
      appIndex: this.appConfig.app.index,
      destination,
      lastValidBlockHeight,
      latestBlockhash,
      mintDecimals,
      mintFeePayer,
      mintPublicKey,
      signer: owner.solana,
      senderCreate: !account?.length && senderCreate,
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
      tx: serializeTransaction(tx),
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
    destinations.forEach((transfer) => {
      if (this.appConfig?.mints.find((mint) => mint.publicKey === transfer.destination)) {
        throw new Error(`Transfers to a mint are not allowed.`)
      }
    })
    mint = mint || this.appConfig.mint.publicKey
    const { mintDecimals, mintPublicKey, mintFeePayer, latestBlockhash, lastValidBlockHeight } =
      await this.prepareTransaction({
        mint,
      })

    const tx = await generateMakeTransferBatchTransaction({
      addMemo: this.appConfig.mint.addMemo,
      appIndex: this.appConfig.app.index,
      destinations,
      lastValidBlockHeight,
      latestBlockhash,
      mintDecimals,
      mintFeePayer,
      mintPublicKey,
      signer: owner.solana,
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
      tx: serializeTransaction(tx),
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
