import { Keypair } from '@kin-kinetic/keypair'
import { Commitment, TransactionType } from '@kin-kinetic/solana'
import { TransferDestination } from './transfer-destination'

export interface MakeTransferOptions extends TransferDestination {
  commitment?: Commitment
  mint?: string
  owner: Keypair
  referenceId?: string
  referenceType?: string
  senderCreate?: boolean
  type?: TransactionType
}
