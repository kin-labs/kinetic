import { ApiProperty } from '@nestjs/swagger'

export class ServiceConfigResponse {
  @ApiProperty()
  mint: string
  @ApiProperty()
  subsidizer: string
  @ApiProperty()
  tokenProgram: string
}
