import { PublicKeyString } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'

export interface GetHistoryOptions {
  account: PublicKeyString
  commitment?: Commitment
  mint?: PublicKeyString
}
