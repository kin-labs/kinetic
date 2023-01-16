import { ApiProperty } from '@nestjs/swagger'

export class TokenAmount {
  @ApiProperty()
  amount: string
  @ApiProperty({ type: 'integer' })
  decimals: number
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  uiAmount: number | null
  @ApiProperty({ nullable: true, required: false })
  uiAmountString?: string
}
