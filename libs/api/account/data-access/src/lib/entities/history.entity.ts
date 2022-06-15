import { PublicKeyString } from '@kin-kinetic/solana'
import { ConfirmedSignatureInfo } from '@solana/web3.js'
import { ApiProperty } from '@nestjs/swagger'

export class HistoryResponse {
  @ApiProperty()
  account: PublicKeyString
  @ApiProperty()
  history: ConfirmedSignatureInfo[]
}
