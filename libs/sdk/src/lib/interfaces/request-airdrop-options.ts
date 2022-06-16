import { PublicKeyString } from '@kin-kinetic/solana'

export interface RequestAirdropOptions {
  account: PublicKeyString
  amount: string
  mint?: string
}
