import { ApiProperty } from '@nestjs/swagger'

export class HealthCheckResponse {
  @ApiProperty()
  isSolanaOk: boolean
  @ApiProperty()
  isMogamiOk: boolean
  @ApiProperty()
  time: string
}
