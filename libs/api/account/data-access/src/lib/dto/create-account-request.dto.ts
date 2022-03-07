import { Commitment, Transaction } from '@solana/web3.js'

export class CreateAccountRequest {
  commitment?: Commitment
  // Signed account create transaction created by the SDK.
  transaction: Transaction
}
