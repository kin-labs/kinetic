import { ApiProperty } from '@nestjs/swagger'

export type TransactionErrorStr = unknown | string

export class SignatureStatus {
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  slot: number | null
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  confirmations: number | null
  @ApiProperty({ nullable: true, required: false })
  err: TransactionErrorStr | null
  @ApiProperty({
    enum: ['processed', 'confirmed', 'finalized'],
    enumName: 'ConfirmationStatus',
    nullable: true,
    required: false,
  })
  confirmationStatus?: 'processed' | 'confirmed' | 'finalized'
}
