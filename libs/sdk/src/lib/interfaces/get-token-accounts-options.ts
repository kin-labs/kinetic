import { PublicKeyString } from '@kin-kinetic/solana'
import { Commitment } from '../../generated'

export interface GetTokenAccountsOptions {
  account: PublicKeyString
  commitment?: Commitment
  mint?: PublicKeyString
}
