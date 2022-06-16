import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'
import { TransferDestination } from './transfer-destination'

export interface MakeTransferOptions extends TransferDestination {
  commitment?: Commitment
  mint?: string
  owner: Keypair
  referenceId?: string
  referenceType?: string
  type?: TransactionType
}
