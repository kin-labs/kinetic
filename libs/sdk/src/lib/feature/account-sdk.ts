import { Keypair } from '@mogami/keypair'
import { getPublicKey } from '@mogami/solana'
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import {
  AccountApi,
  Configuration,
  RecentBlockhashResponse,
  ServiceConfigResponse,
  TransactionApi,
} from '../../generated'

export class AccountSdk {
  private api: AccountApi
  private tx: TransactionApi
  constructor(apiConfig: Configuration) {
    this.api = new AccountApi(apiConfig)
    this.tx = new TransactionApi(apiConfig)
  }
  accountInfo(accountId: string) {
    return this.api.apiAccountFeatureControllerGetAccountInfo(accountId)
  }

  balance(accountId: string) {
    return this.api.apiAccountFeatureControllerGetBalance(accountId)
  }

  history(accountId: string) {
    return this.api.apiAccountFeatureControllerGetHistory(accountId)
  }

  tokenAccounts(accountId: string) {
    return this.api.apiAccountFeatureControllerTokenAccounts(accountId)
  }

  async create(owner: Keypair) {
    const [{ mint, subsidizer }, { blockhash: recentBlockhash }] = await Promise.all([
      this.tx.apiTransactionFeatureControllerGetServiceConfig().then((res) => res.data as ServiceConfigResponse),
      this.tx.apiTransactionFeatureControllerGetRecentBlockhash().then((res) => res.data as RecentBlockhashResponse),
    ])

    // Create objects from Response
    const mintKey = getPublicKey(mint)
    const subsidizerKey = getPublicKey(subsidizer)

    // Get AssociatedTokenAccount
    const associatedTokenAccount = await getAssociatedTokenAddress(mintKey, owner.solanaPublicKey)

    console.log('associatedTokenAccount', associatedTokenAccount.toBase58())
    // Create Transaction
    const instructions: TransactionInstruction[] = [
      createAssociatedTokenAccountInstruction(subsidizerKey, associatedTokenAccount, owner.solanaPublicKey, mintKey),
    ]

    const transaction = new Transaction({
      feePayer: subsidizerKey,
      recentBlockhash,
      signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
    }).add(...instructions)

    // Sign and Serialize Transaction
    transaction.partialSign(...[owner.solana])

    const serialized = transaction.serialize({ requireAllSignatures: false, verifySignatures: false })

    // Submit Transaction
    const res = await this.api.apiAccountFeatureControllerCreateAccount({ tx: JSON.stringify(serialized) })

    console.log('res', res)
    return Promise.resolve({ mint, subsidizer, recentBlockhash, res })
  }
}
