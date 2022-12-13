import { Commitment, PublicKeyString } from '@kin-kinetic/solana'

export interface GetBalanceOptions {
  account: PublicKeyString
  commitment?: Commitment
}
