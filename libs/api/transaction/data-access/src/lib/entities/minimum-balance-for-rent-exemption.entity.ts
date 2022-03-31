import { ApiProperty } from '@nestjs/swagger'

export class MinimumBalanceForRentExemptionResponse {
  @ApiProperty()
  lamports: number
}
