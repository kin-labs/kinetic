import { Commitment } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class RequestAirdropRequest {
  @ApiProperty({ required: true })
  account: string
  @ApiProperty({ required: false })
  amount?: string
  @ApiProperty({ enum: Commitment })
  commitment: Commitment
  @ApiProperty({ required: true })
  environment: string
  @ApiProperty()
  index: number
  @ApiProperty()
  mint: string
}
