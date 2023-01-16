import { ApiProperty } from '@nestjs/swagger'

export class CompiledInstruction {
  @ApiProperty({ type: 'integer' })
  programIdIndex: number
  @ApiProperty({ type: 'integer', isArray: true })
  accounts: number[]
  @ApiProperty()
  data: string
}
