import { ApiProperty } from '@nestjs/swagger'

export class SubmitPaymentRequest {
  // Signed account create transaction created by the SDK.
  @ApiProperty()
  tx: string
}
