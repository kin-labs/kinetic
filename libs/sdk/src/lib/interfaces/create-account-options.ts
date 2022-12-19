import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '../../generated'

export interface CreateAccountOptions {
  commitment?: Commitment
  mint?: string
  owner: Keypair
  referenceId?: string
  referenceType?: string
}
