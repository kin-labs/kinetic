import { PublicKeyString } from '@kin-kinetic/solana'
import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@kin-kinetic/keypair'
import { TransferDestination } from './transfer-destination'

export interface SerializeMakeTransferOptions extends TransferDestination {
  amount: string
  appIndex: number
  destination: PublicKeyString
  lastValidBlockHeight: number
  latestBlockhash: string
  mintDecimals: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
  type: TransactionType
  senderCreate?: boolean
}
