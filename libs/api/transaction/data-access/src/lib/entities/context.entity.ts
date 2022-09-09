import { ApiProperty } from '@nestjs/swagger'

export class Context {
  @ApiProperty()
  slot: number
}
