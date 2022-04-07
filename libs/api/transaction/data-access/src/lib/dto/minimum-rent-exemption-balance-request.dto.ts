import { ApiProperty } from '@nestjs/swagger'

export class MinimumRentExemptionBalanceRequest {
  @ApiProperty()
  dataLength: number
}
