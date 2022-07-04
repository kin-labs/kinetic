import { PublicKeyString } from '../interfaces'
import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@kin-kinetic/keypair'

export interface SerializeMakeTransferOptions {
  amount: string
  appIndex: number
  destination: PublicKeyString
  lastValidBlockHeight: number
  latestBlockhash: string
  mintDecimals: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
  senderCreate?: boolean
  type: TransactionType
}
