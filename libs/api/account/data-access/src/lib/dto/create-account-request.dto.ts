import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountRequest {
  @ApiProperty()
  environment: string
  @ApiProperty({ type: 'integer' })
  index: number
  @ApiProperty()
  mint: string
  @ApiProperty({ type: 'string', format: 'byte' })
  tx: string
}
