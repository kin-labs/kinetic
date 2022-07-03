import { ApiProperty } from '@nestjs/swagger'

export class MinimumRentExemptionBalanceResponse {
  @ApiProperty({ type: 'float' })
  lamports: number
}
