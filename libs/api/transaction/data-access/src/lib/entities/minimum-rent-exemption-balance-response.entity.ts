import { ApiProperty } from '@nestjs/swagger'

export class MinimumRentExemptionBalanceResponse {
  @ApiProperty({ type: 'integer' })
  lamports: number
}
