import { ApiProperty } from '@nestjs/swagger'

export class AppConfigMint {
  @ApiProperty()
  airdrop: boolean
  @ApiProperty()
  airdropAmount: number
  @ApiProperty()
  airdropMax: number
  @ApiProperty()
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
