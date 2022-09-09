import { ApiProperty } from '@nestjs/swagger'

export type TransactionErrorStr = unknown | string

export class SignatureStatus {
  @ApiProperty({ required: false })
  slot: number | null
  @ApiProperty({ required: false })
  confirmations: number | null
  @ApiProperty({ required: false })
  err: TransactionErrorStr | null
  @ApiProperty({ enum: ['processed', 'confirmed', 'finalized'], required: false })
  confirmationStatus?: 'processed' | 'confirmed' | 'finalized'
}
