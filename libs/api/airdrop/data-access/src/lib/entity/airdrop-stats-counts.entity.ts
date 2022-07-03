import { ApiProperty } from '@nestjs/swagger'

export class AirdropStatsCounts {
  @ApiProperty({ type: 'integer' })
  averageValue: number
  @ApiProperty({ type: 'integer' })
  total: number
  @ApiProperty({ type: 'integer' })
  totalValue: number
}
