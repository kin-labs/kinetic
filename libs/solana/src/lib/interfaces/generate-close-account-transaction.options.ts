import { Keypair } from '@solana/web3.js'
import { PublicKeyString } from './public-key-string'

export interface GenerateCloseAccountTransactionOptions {
  addMemo: boolean
  blockhash: string
  index: number
  lastValidBlockHeight: number
  tokenAccount: PublicKeyString
  signer: Keypair
}
