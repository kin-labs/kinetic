import { ApiProperty } from '@nestjs/swagger'

export class AirdropStatsDate {
  @ApiProperty()
  date: string
  @ApiProperty()
  count: number
}
