import { PublicKeyString } from '@kin-kinetic/solana'

export interface TransferDestination {
  amount: string
  destination: PublicKeyString
}
