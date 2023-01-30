import { Commitment } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountRequest {
  @ApiProperty({ enum: Commitment, enumName: 'Commitment' })
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
  reference?: string
  @ApiProperty({ nullable: true, required: false, deprecated: true })
  referenceId?: string
  @ApiProperty({ nullable: true, required: false, deprecated: true })
  referenceType?: string
  @ApiProperty()
  tx: string
}
