import { ApiProperty } from '@nestjs/swagger'
import { CompiledInstruction } from './compiled-instruction.entity'

export class CompiledInnerInstruction {
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty({ type: [CompiledInstruction] })
  instructions: CompiledInstruction[]
}
