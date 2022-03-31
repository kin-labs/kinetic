import { ApiProperty } from '@nestjs/swagger'

export class BalanceResponse {
  @ApiProperty()
  value: string
}
