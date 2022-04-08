import { ApiProperty } from '@nestjs/swagger'

export class MinimumRentExemptionBalanceResponse {
  @ApiProperty()
  lamports: number
}
