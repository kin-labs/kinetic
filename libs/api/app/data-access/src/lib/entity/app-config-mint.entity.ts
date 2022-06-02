import { ApiProperty } from '@nestjs/swagger'

export class AppConfigMint {
  @ApiProperty()
  airdrop: boolean
  @ApiProperty()
  feePayer: string
  @ApiProperty()
  logoUrl: string
  @ApiProperty()
  programId: string
  @ApiProperty()
  publicKey: string
  @ApiProperty()
  symbol: string
}
