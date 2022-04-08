import { ApiProperty } from '@nestjs/swagger'

export class RequestAirdropResponse {
  @ApiProperty()
  signature: string
}
