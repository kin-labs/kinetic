import { Commitment } from '@mogami/solana'
import { ApiProperty } from '@nestjs/swagger'

export class MakeTransferRequest {
  @ApiProperty({ enum: Commitment })
  commitment: Commitment
  @ApiProperty()
  index: number
  @ApiProperty()
  lastValidBlockHeight: number
  @ApiProperty()
  tx: Buffer
}
