import { Commitment } from '@solana/web3.js'

export interface AccountInfoRequest {
  commitment?: Commitment
  accountId: string // publicKey of the account
}
