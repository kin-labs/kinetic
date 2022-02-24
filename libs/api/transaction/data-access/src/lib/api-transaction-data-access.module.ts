import { Module } from '@nestjs/common'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

@Module({
  controllers: [],
  providers: [ApiTransactionDataAccessService],
  exports: [ApiTransactionDataAccessService],
})
export class ApiTransactionDataAccessModule {}
