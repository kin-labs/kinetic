import { ApiProperty } from '@nestjs/swagger'

export class AirdropRequest {
  @ApiProperty({ required: true })
  account: string
  @ApiProperty({ required: false })
  amount?: string
}
