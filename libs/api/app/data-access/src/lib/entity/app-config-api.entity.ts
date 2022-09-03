import { ApiProperty } from '@nestjs/swagger'

export class AppConfigApi {
  @ApiProperty()
  name: string
  @ApiProperty()
  version: string
}
