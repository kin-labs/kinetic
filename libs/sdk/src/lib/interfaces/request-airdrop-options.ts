import { PublicKeyString } from '@mogami/solana'

export interface RequestAirdropOptions {
  account: PublicKeyString
  amount: string
}
