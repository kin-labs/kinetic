import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountRequest {
  @ApiProperty()
  index: number
  @ApiProperty()
  tx: Uint8Array
}
