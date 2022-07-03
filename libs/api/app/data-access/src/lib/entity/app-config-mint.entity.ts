import { ApiProperty } from '@nestjs/swagger'

export class AppConfigMint {
  @ApiProperty()
  airdrop: boolean
  @ApiProperty({ type: 'integer' })
  airdropAmount: number
  @ApiProperty({ type: 'integer' })
  airdropMax: number
  @ApiProperty({ type: 'integer' })
  decimals: number
  @ApiProperty()
  feePayer: string
  @ApiProperty()
  logoUrl: string
  @ApiProperty()
  name: string
  @ApiProperty()
  programId: string
  @ApiProperty()
  publicKey: string
  @ApiProperty()
  symbol: string
}
