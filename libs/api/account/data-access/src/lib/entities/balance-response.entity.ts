import { BalanceMintMap } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'

export class BalanceResponse {
  @ApiProperty()
  balance: string
  @ApiProperty()
  mints: BalanceMintMap
  @ApiProperty({ type: () => BalanceToken, isArray: true })
  tokens: BalanceToken[]
}

export class BalanceToken {
  @ApiProperty()
  account: string
  @ApiProperty()
  balance: string
  @ApiProperty()
  mint: string
}
