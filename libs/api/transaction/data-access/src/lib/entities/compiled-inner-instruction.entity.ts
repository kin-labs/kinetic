import { ApiProperty } from '@nestjs/swagger'
import { CompiledInstruction } from './compiled-instruction.entity'

export class CompiledInnerInstruction {
  @ApiProperty()
  index: number
  @ApiProperty()
  instructions: CompiledInstruction[]
}
