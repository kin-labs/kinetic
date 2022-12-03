import { ApiProperty } from '@nestjs/swagger'

export class BalanceToken {
  @ApiProperty()
  account: string
  @ApiProperty()
  balance: string
  @ApiProperty({ default: '0', type: 'integer' })
  decimals: number
  @ApiProperty()
  mint: string
}
