import { ApiProperty } from '@nestjs/swagger'

export class HistoryResponse {
  @ApiProperty()
  account: string
  @ApiProperty({ type: () => ConfirmedSignatureInfo, isArray: true })
  history: ConfirmedSignatureInfo[]
}

export class ConfirmedSignatureInfo {
  @ApiProperty()
  signature: string
  @ApiProperty()
  slot: number
  @ApiProperty()
  err: string | null
  @ApiProperty()
  memo: string | null
  @ApiProperty()
  blockTime?: number | null
}
