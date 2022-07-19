import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'

export interface CloseAccountOptions {
  commitment?: Commitment
  mint?: string
  owner: Keypair
}
