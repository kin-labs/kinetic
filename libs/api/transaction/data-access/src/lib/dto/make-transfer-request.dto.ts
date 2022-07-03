import { Commitment } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class MakeTransferRequest {
  @ApiProperty({ enum: Commitment })
  commitment: Commitment
  @ApiProperty()
  environment: string
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty()
  mint: string
  @ApiProperty({ type: 'integer' })
  lastValidBlockHeight: number
  @ApiProperty({ nullable: true })
  referenceId?: string
  @ApiProperty({ nullable: true })
  referenceType?: string
  @ApiProperty({ type: 'string', format: 'byte' })
  tx: string
}
