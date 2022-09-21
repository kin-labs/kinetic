import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@solana/web3.js'
import { PublicKeyString } from '../interfaces'

export interface GenerateMakeTransferOptions {
  addMemo: boolean
  amount: string
  blockhash: string
  destination: PublicKeyString
  index: number
  lastValidBlockHeight: number
  mintDecimals: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
  senderCreate?: boolean
  type: TransactionType
}
