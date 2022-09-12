import { ApiProperty } from '@nestjs/swagger'

export class TokenAmount {
  @ApiProperty()
  amount: string
  @ApiProperty()
  decimals: number
  @ApiProperty({ required: false })
  uiAmount: number | null
  @ApiProperty({ required: false })
  uiAmountString?: string
}
