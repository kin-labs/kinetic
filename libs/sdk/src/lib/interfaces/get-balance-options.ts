import { PublicKeyString } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'

export interface GetBalanceOptions {
  account: PublicKeyString
  commitment?: Commitment
}
