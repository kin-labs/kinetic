import { PublicKeyString } from '@mogami/solana'

export interface TransferDestination {
  amount: string
  destination: PublicKeyString
}
