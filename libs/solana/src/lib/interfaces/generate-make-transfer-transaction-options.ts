import { Keypair } from '@solana/web3.js'
import { PublicKeyString } from '../interfaces'
import { TransactionType } from '../kin'

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
