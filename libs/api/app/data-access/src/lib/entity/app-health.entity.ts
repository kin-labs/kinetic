import { ApiProperty } from '@nestjs/swagger'

export class AppHealth {
  @ApiProperty()
  isSolanaOk: boolean
  @ApiProperty()
  isKineticOk: boolean
  @ApiProperty()
  time: Date
}
