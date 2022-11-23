import { ApiProperty } from '@nestjs/swagger'

export class Context {
  @ApiProperty({ type: 'integer' })
  slot: number
}
