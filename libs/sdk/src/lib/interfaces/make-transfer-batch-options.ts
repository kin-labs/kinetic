import { MakeTransferOptions } from './make-transfer-options'
import { TransferDestination } from './transfer-destination'

export interface MakeTransferBatchOptions extends Omit<MakeTransferOptions, 'destination' | 'amount'> {
  destinations: TransferDestination[]
}
