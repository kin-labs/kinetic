import { ApiProperty } from '@nestjs/swagger'
import { AirdropStatsCounts } from './airdrop-stats-counts.entity'
import { AirdropStatsDate } from './airdrop-stats-date.entity'

export class AirdropStats {
  @ApiProperty()
  counts: AirdropStatsCounts
  @ApiProperty()
  dates: AirdropStatsDate[]
}
