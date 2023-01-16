import { ApiProperty } from '@nestjs/swagger'

export class TokenInfo {
  @ApiProperty()
  account: string

  @ApiProperty({ required: false, nullable: true })
  balance?: string

  @ApiProperty({ required: false, nullable: true })
  closeAuthority?: string

  @ApiProperty({ default: '0', type: 'integer' })
  decimals: number

  @ApiProperty()
  mint: string

  @ApiProperty({ required: false, nullable: true })
  owner?: string
}
