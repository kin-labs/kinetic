import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountRequest {
  // Signed account create transaction created by the SDK.
  @ApiProperty()
  tx: string
}
