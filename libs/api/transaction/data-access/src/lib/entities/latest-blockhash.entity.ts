import { ApiProperty } from '@nestjs/swagger'

export class LatestBlockhashResponse {
  @ApiProperty()
  blockhash: string
  @ApiProperty()
  lastValidBlockHeight: number
}
