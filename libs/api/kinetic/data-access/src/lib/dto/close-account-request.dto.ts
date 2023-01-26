import { Commitment } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class CloseAccountRequest {
  @ApiProperty({ enum: Commitment, enumName: 'Commitment' })
  commitment: Commitment
  @ApiProperty({ required: true })
  account: string
  @ApiProperty()
  environment: string
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty()
  mint: string
  @ApiProperty({ required: false, nullable: true })
  reference?: string
}
