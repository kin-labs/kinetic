import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

@Module({
  controllers: [],
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTransactionDataAccessService],
  exports: [ApiTransactionDataAccessService],
})
export class ApiTransactionDataAccessModule {}
