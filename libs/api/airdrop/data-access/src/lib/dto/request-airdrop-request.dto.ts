import { ApiProperty } from '@nestjs/swagger'

export class RequestAirdropRequest {
  @ApiProperty({ required: true })
  account: string
  @ApiProperty({ required: false })
  amount?: string
  @ApiProperty({ required: true })
  environment: string
  @ApiProperty()
  index: number
  @ApiProperty()
  mint: string
}
