import { ApiProperty } from '@nestjs/swagger'

export class AppHealth {
  @ApiProperty()
  isSolanaOk: boolean
  @ApiProperty()
  isMogamiOk: boolean
  @ApiProperty()
  time: Date
}
