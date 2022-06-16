import { PublicKeyString } from '@kin-kinetic/solana'

export interface GetTokenAccountsOptions {
  account: PublicKeyString
  mint?: PublicKeyString
}
