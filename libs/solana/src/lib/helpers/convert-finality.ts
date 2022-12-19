import { Finality } from '@solana/web3.js'
import { Commitment } from '../interfaces'

export function convertFinality(commitment: Commitment): Finality {
  switch (commitment) {
    case Commitment.Confirmed:
    case Commitment.Processed:
      return 'confirmed'
    case Commitment.Finalized:
    default:
      return 'finalized'
  }
}
