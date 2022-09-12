import { ApiProperty } from '@nestjs/swagger'

export class ConfirmedSignatureInfo {
  @ApiProperty()
  signature: string
  @ApiProperty({ required: false })
  slot: number | null
  @ApiProperty({ required: false })
  err: string | null
  @ApiProperty({ required: false })
  memo: string | null
  @ApiProperty({ required: false })
  blockTime?: number | null
}
