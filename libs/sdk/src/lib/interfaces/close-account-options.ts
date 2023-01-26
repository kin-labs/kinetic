import { PublicKeyString } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'

export interface CloseAccountOptions {
  account: PublicKeyString
  commitment?: Commitment
  mint?: string
  reference?: string
}
