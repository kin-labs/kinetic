import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiAppDataAccessModule],
  providers: [ApiTransactionDataAccessService],
  exports: [ApiTransactionDataAccessService],
})
export class ApiTransactionDataAccessModule {}
