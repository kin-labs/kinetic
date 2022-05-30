import { Commitment as SolanaCommitment } from '@solana/web3.js'
import { Commitment } from '../interfaces'

export function convertCommitment(commitment: Commitment): SolanaCommitment {
  switch (commitment) {
    case Commitment.Confirmed:
      return 'confirmed'
    case Commitment.Finalized:
      return 'finalized'
    case Commitment.Processed:
      return 'processed'
    default:
      return 'finalized'
  }
}
