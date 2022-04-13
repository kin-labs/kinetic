import { ApiProperty } from '@nestjs/swagger'
import { AppConfigApp } from './app-config-app.entity'
import { AppConfigMint } from './app-config-mint.entity'

export class AppConfig {
  @ApiProperty()
  hostname: string
  @ApiProperty()
  env: string
  @ApiProperty()
  app: AppConfigApp
  @ApiProperty()
  mint: AppConfigMint
}
