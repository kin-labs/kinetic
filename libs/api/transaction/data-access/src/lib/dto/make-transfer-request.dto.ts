import { ApiProperty } from '@nestjs/swagger'

export class MakeTransferRequest {
  // Signed account create transaction created by the SDK.
  @ApiProperty()
  tx: string
}
