import { ApiProperty } from '@nestjs/swagger'

export class ApiConfigSummary {
  @ApiProperty()
  port: number

  @ApiProperty()
  environment: string
}
