import { ApiProperty } from '@nestjs/swagger'
import { Context } from './context.entity'
import { SignatureStatus } from './signature-status.entity'

export class RpcResponseAndContext {
  @ApiProperty()
  context: Context
  @ApiProperty()
  value: SignatureStatus
}
