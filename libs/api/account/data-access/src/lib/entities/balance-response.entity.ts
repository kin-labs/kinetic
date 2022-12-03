import { BalanceMintMap } from '@kin-kinetic/solana'
import { ApiProperty } from '@nestjs/swagger'
import { BalanceToken } from './balance-token.entity'

export class BalanceResponse {
  @ApiProperty()
  balance: string
  @ApiProperty()
  mints: BalanceMintMap
  @ApiProperty({ type: () => BalanceToken, isArray: true })
  tokens: BalanceToken[]
}
