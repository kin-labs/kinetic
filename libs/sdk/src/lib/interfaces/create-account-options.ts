import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'

export interface CreateAccountOptions {
  commitment?: Commitment
  mint?: string
  owner: Keypair
  referenceId?: string
  referenceType?: string
}
