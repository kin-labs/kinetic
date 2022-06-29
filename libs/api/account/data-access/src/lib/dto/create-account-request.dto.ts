import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountRequest {
  @ApiProperty()
  environment: string
  @ApiProperty()
  index: number
  @ApiProperty()
  mint: string
  @ApiProperty({ type: 'string', format: 'binary' })
  tx: string
}
