import { ApiProperty } from '@nestjs/swagger'

export class TokenAmount {
  @ApiProperty()
  amount: string
  @ApiProperty()
  decimals: number
  @ApiProperty({ nullable: true, required: false })
  uiAmount: number | null
  @ApiProperty({ nullable: true, required: false })
  uiAmountString?: string
}
