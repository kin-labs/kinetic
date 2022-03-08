import { FeeCalculator } from '@solana/web3.js'

export interface RecentBlockhashResponse {
  blockhash: string
  feeCalculator: FeeCalculator
}
