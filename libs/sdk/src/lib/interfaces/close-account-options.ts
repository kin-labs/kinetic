import { PublicKeyString } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'

export interface CloseAccountOptions {
  commitment?: Commitment
  account: PublicKeyString
  mint?: string
  referenceId?: string
  referenceType?: string
}
