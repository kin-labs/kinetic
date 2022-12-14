import { ApiProperty } from '@nestjs/swagger'

export class Context {
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  slot: number
}
