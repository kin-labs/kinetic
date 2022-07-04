import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@solana/web3.js'
import { PublicKeyString } from '../interfaces'

export interface GenerateMakeTransferOptions {
  amount: string
  appIndex: number
  destination: PublicKeyString
  lastValidBlockHeight: number
  latestBlockhash: string
  mintDecimals: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  signer: Keypair
  senderCreate?: boolean
  type: TransactionType
}
