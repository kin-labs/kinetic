import { ApiConfigDataAccessModule } from '@kin-kinetic/api/config/data-access'
import { Module } from '@nestjs/common'
import { OpenTelemetryCoreModule } from 'nestjs-otel/lib/opentelemetry-core.module'
import { ApiCoreService } from './api-core.service'
import { ApiCoreCacheModule } from './cache/api-core-cache.module'

@Module({
  imports: [ApiCoreCacheModule, ApiConfigDataAccessModule, OpenTelemetryCoreModule.forRoot()],
  providers: [ApiCoreService],
  exports: [ApiCoreService],
})
export class ApiCoreDataAccessModule {}
