import { PublicKeyString } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'

export interface GetAccountInfoOptions {
  account: PublicKeyString
  commitment?: Commitment
  mint?: PublicKeyString
}
