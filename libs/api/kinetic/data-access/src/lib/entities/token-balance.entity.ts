import { ApiProperty } from '@nestjs/swagger'
import { TokenAmount } from './token-amount.entity'

export class TokenBalance {
  @ApiProperty({ type: 'integer' })
  accountIndex: number
  @ApiProperty()
  mint: string
  @ApiProperty({ nullable: true, required: false })
  owner?: string
  @ApiProperty()
  uiTokenAmount: TokenAmount
}
