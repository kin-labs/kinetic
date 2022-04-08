import { ApiProperty } from '@nestjs/swagger'

export class RequestAirdropRequest {
  @ApiProperty({ required: true })
  account: string
  @ApiProperty({ required: false })
  amount?: string
}
