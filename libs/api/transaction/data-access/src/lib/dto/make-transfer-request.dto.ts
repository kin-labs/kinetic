import { Commitment } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class MakeTransferRequest {
  @ApiProperty({ enum: Commitment, enumName: 'Commitment' })
  commitment: Commitment
  @ApiProperty()
  environment: string
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty()
  mint: string
  @ApiProperty({ type: 'integer' })
  lastValidBlockHeight: number
  @ApiProperty({ nullable: true, required: false })
  reference?: string
  @ApiProperty()
  tx: string
}
