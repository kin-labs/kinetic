import { ApiProperty } from '@nestjs/swagger'
import { ConfirmedSignatureInfo } from './confirmed-signature-info.entity'

export class HistoryResponse {
  @ApiProperty()
  account: string
  @ApiProperty({ type: () => ConfirmedSignatureInfo, isArray: true })
  history: ConfirmedSignatureInfo[]
}
