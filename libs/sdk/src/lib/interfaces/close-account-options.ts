import { Commitment, PublicKeyString } from '@kin-kinetic/solana'

export interface CloseAccountOptions {
  commitment?: Commitment
  account: PublicKeyString
  mint?: string
  referenceId?: string
  referenceType?: string
}
