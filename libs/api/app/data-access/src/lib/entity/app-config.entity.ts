import { ApiProperty } from '@nestjs/swagger'
import { AppConfigApp } from './app-config-app.entity'
import { AppConfigEnvironment } from './app-config-environment.entity'
import { AppConfigMint } from './app-config-mint.entity'

export class AppConfig {
  @ApiProperty()
  app: AppConfigApp
  @ApiProperty()
  environment: AppConfigEnvironment
  @ApiProperty()
  mint: AppConfigMint
  @ApiProperty({ type: [AppConfigMint] })
  mints: AppConfigMint[]
}
