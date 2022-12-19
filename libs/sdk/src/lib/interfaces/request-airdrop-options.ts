import { PublicKeyString } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'

export interface RequestAirdropOptions {
  account: PublicKeyString
  amount: string
  commitment?: Commitment
  mint?: string
}
