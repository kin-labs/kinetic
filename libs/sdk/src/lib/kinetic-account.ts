import { Keypair } from '@kin-kinetic/keypair'
import { BalanceResponse, GetTransactionResponse, HistoryResponse, Transaction } from '../generated'
import {
  CreateAccountOptions,
  GetHistoryOptions,
  GetTokenAccountsOptions,
  GetTransactionOptions,
  KineticAccountConfig,
  MakeTransferBatchOptions,
  MakeTransferOptions,
  RequestAirdropOptions,
} from './interfaces'
import { KineticSdk } from './kinetic-sdk'

export class KineticAccount {
  readonly owner: Keypair
  readonly sdk: KineticSdk

  constructor({ owner, sdk }: { owner: Keypair; sdk: KineticSdk }) {
    this.owner = owner
    this.sdk = sdk
  }

  createAccount(options: Omit<CreateAccountOptions, 'owner'>): Promise<Transaction> {
    return this.sdk.createAccount({ ...options, owner: this.owner })
  }

  getBalance(): Promise<BalanceResponse> {
    return this.sdk.getBalance({ account: this.owner.publicKey })
  }

  getExplorerUrl(path: string): string | undefined {
    return this.sdk.getExplorerUrl(path)
  }

  getHistory(options: Omit<GetHistoryOptions, 'account'>): Promise<HistoryResponse[]> {
    return this.sdk.getHistory({ ...options, account: this.owner.publicKey })
  }

  getTokenAccounts(options: Omit<GetTokenAccountsOptions, 'account'>): Promise<string[]> {
    return this.sdk.getTokenAccounts({ ...options, account: this.owner.publicKey })
  }

  getTransaction(options: GetTransactionOptions): Promise<GetTransactionResponse> {
    return this.sdk.getTransaction({ ...options })
  }

  makeTransfer(options: Omit<MakeTransferOptions, 'owner'>): Promise<Transaction> {
    return this.sdk.makeTransfer({ ...options, owner: this.owner })
  }

  makeTransferBatch(options: Omit<MakeTransferBatchOptions, 'owner'>): Promise<Transaction> {
    return this.sdk.makeTransferBatch({ ...options, owner: this.owner })
  }

  requestAirdrop(options: Omit<RequestAirdropOptions, 'account'>): Promise<Transaction> {
    return this.sdk.requestAirdrop({ ...options, account: this.owner.publicKey })
  }

  static async setup(config: KineticAccountConfig): Promise<KineticAccount> {
    const sdk = await KineticSdk.setup(config)

    return new KineticAccount({ sdk, owner: config.owner })
  }
}
