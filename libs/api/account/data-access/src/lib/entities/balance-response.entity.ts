import { ApiProperty } from '@nestjs/swagger'
import BigNumber from 'bignumber.js'

export type BalanceMintMap = Record<string, BigNumber>

export class BalanceResponse {
  @ApiProperty()
  balance: BigNumber
  @ApiProperty()
  mints: BalanceMintMap
  @ApiProperty({ type: () => BalanceToken, isArray: true })
  tokens: BalanceToken[]
}

export class BalanceToken {
  @ApiProperty()
  account: string
  @ApiProperty()
  balance: BigNumber
  @ApiProperty()
  mint: string
}
