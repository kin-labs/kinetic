import { Keypair } from '@solana/web3.js'
import { PublicKeyString } from '../interfaces'

export interface GenerateCreateAccountTransactionOptions {
  addMemo: boolean
  blockhash: string
  index: number
  lastValidBlockHeight: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
  ownerTokenAccount: PublicKeyString
  reference?: string | null
}
