import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigDataAccessService } from './api-config-data-access.service'

@Module({
  controllers: [],
  providers: [ApiConfigDataAccessService],
  exports: [ApiConfigDataAccessService],
  imports: [ConfigModule],
})
export class ApiConfigDataAccessModule {}
