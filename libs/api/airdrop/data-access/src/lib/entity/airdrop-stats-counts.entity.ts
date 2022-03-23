import { ApiProperty } from '@nestjs/swagger'

export class AirdropStatsCounts {
  @ApiProperty()
  averageValue: number
  @ApiProperty()
  total: number
  @ApiProperty()
  totalValue: number
}
