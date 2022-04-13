import { ApiProperty } from '@nestjs/swagger'

export class AppConfigApp {
  @ApiProperty()
  index: number
  @ApiProperty()
  name: string
}
