import { Commitment, PublicKeyString } from '@kin-kinetic/solana'

export interface RequestAirdropOptions {
  account: PublicKeyString
  amount: string
  commitment?: Commitment
  mint?: string
}
