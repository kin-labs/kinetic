import { ApiProperty } from '@nestjs/swagger'

export class MakeTransferRequest {
  @ApiProperty()
  index: number
  @ApiProperty()
  tx: Buffer
}
