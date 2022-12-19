import { Keypair } from '@kin-kinetic/keypair'
import { TransactionType } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'
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
