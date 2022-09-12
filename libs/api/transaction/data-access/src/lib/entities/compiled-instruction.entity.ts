import { ApiProperty } from '@nestjs/swagger'

export class CompiledInstruction {
  @ApiProperty()
  programIdIndex: number
  @ApiProperty()
  accounts: number[]
  @ApiProperty()
  data: string
}
