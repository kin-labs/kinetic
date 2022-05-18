import { PublicKeyString } from './public-key-string'

export interface Payment {
  amount: string
  destination: PublicKeyString
}
