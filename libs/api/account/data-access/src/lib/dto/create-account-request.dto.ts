import { Commitment } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountRequest {
  @ApiProperty({ enum: Commitment })
  commitment: Commitment
  @ApiProperty()
  environment: string
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty({ type: 'integer' })
  lastValidBlockHeight: number
  @ApiProperty()
  mint: string
  @ApiProperty({ required: false, nullable: true })
  referenceId?: string
  @ApiProperty({ required: false, nullable: true })
  referenceType?: string
  @ApiProperty({ type: 'string', format: 'byte' })
  tx: string
}
