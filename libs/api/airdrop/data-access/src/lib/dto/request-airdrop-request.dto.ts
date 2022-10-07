import { Commitment } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class RequestAirdropRequest {
  @ApiProperty({ required: true })
  account: string
  @ApiProperty({ required: false, nullable: true })
  amount?: string
  @ApiProperty({ enum: Commitment, enumName: 'Commitment' })
  commitment: Commitment
  @ApiProperty({ required: true })
  environment: string
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty()
  mint: string
}
