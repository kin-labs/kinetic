import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@mogami/keypair'
import { Commitment } from '@mogami/solana'
import { TransferDestination } from './transfer-destination'

export interface MakeTransferOptions extends TransferDestination {
  commitment?: Commitment
  owner: Keypair
  referenceId?: string
  referenceType?: string
  type?: TransactionType
}
