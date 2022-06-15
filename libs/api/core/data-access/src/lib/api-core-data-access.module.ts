import { ApiConfigDataAccessModule } from '@kin-kinetic/api/config/data-access'
import { Module } from '@nestjs/common'
import { OpenTelemetryCoreModule } from 'nestjs-otel/lib/opentelemetry-core.module'
import { ApiCoreDataAccessService } from './api-core-data-access.service'

@Module({
  imports: [ApiConfigDataAccessModule, OpenTelemetryCoreModule.forRoot()],
  providers: [ApiCoreDataAccessService],
  exports: [ApiCoreDataAccessService],
})
export class ApiCoreDataAccessModule {}
