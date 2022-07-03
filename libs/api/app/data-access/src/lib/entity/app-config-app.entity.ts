import { ApiProperty } from '@nestjs/swagger'

export class AppConfigApp {
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty()
  name: string
}
