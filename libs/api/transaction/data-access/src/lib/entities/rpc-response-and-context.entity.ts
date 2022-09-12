import { ApiProperty } from '@nestjs/swagger'
import { Context } from './context.entity'

export class RpcResponseAndContext<T> {
  @ApiProperty()
  context: Context
  value: T
}
