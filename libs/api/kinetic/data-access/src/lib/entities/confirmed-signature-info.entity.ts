import { ApiProperty } from '@nestjs/swagger'

export class ConfirmedSignatureInfo {
  @ApiProperty()
  signature: string
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  slot?: number | null
  @ApiProperty({ nullable: true, required: false })
  err?: string | null
  @ApiProperty({ nullable: true, required: false })
  memo?: string | null
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  blockTime?: number | null
}
