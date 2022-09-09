import { ApiProperty } from '@nestjs/swagger'
import { ConfirmedTransactionMeta } from './confirmed-transaction-meta.entity'
import { TransactionData } from './transaction-data.entity'

export class TransactionResponse {
  @ApiProperty({ required: false })
  slot: number | null
  @ApiProperty()
  transaction: TransactionData
  @ApiProperty()
  meta: ConfirmedTransactionMeta | null
  @ApiProperty({ required: false })
  blockTime?: number | null
}
