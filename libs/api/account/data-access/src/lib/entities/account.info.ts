import { ApiProperty } from '@nestjs/swagger'
import { TokenInfo } from './token-info.entity'

export class AccountInfo {
  @ApiProperty()
  account: string

  @ApiProperty()
  isMint: boolean

  @ApiProperty()
  isOwner: boolean

  @ApiProperty()
  isTokenAccount: boolean

  @ApiProperty({ required: false, nullable: true })
  owner?: string

  @ApiProperty({ required: false, nullable: true })
  program?: string

  @ApiProperty({ required: false, nullable: true, type: () => TokenInfo, isArray: true })
  tokens: TokenInfo[]
}
