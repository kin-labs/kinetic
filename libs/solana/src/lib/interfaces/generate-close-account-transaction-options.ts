import { Keypair } from '@solana/web3.js'
import { PublicKeyString } from '../interfaces'

export interface GenerateCloseAccountTransactionOptions {
  appIndex: number
  lastValidBlockHeight: number
  latestBlockhash: string
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  signer: Keypair
}
