import { ApiProperty } from '@nestjs/swagger'

export class MakeTransferResponse {
  @ApiProperty()
  signature: string
}
