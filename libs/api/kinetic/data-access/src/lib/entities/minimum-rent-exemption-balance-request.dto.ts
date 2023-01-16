import { ApiProperty } from '@nestjs/swagger'

export class MinimumRentExemptionBalanceRequest {
  @ApiProperty({ type: 'integer' })
  dataLength: number
}
