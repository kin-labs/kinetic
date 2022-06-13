import { Keypair } from '@mogami/keypair'
import { Commitment } from '@mogami/solana'

export interface CreateAccountOptions {
  owner: Keypair
  commitment?: Commitment
}
