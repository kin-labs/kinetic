import { ApiProperty } from '@nestjs/swagger'

export class AirdropResponse {
  @ApiProperty()
  signature: string
}
