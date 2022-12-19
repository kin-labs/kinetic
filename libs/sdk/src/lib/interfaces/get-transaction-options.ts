import { Commitment } from '../../generated'

export interface GetTransactionOptions {
  commitment?: Commitment
  signature: string
}
