import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { MetricService } from 'nestjs-otel'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiAppDataAccessModule],
  providers: [ApiTransactionDataAccessService, MetricService],
  exports: [ApiTransactionDataAccessService, MetricService],
})
export class ApiTransactionDataAccessModule {}
