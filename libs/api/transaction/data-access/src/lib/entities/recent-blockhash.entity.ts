import { ApiProperty } from '@nestjs/swagger'

export class RecentBlockhashResponse {
  @ApiProperty()
  blockhash: string
}
