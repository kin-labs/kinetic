import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigService } from './api-config.service'

@Module({
  providers: [ApiConfigService],
  exports: [ApiConfigService],
  imports: [ConfigModule],
})
export class ApiConfigDataAccessModule {}
