import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'

export interface CreateAccountOptions {
  owner: Keypair
  commitment?: Commitment
}
