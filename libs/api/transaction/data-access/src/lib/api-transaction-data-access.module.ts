import { Module } from '@nestjs/common'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'
import { ApiConfigDataAccessModule } from '@mogami/api/config/data-access'

@Module({
  controllers: [],
  imports: [ApiConfigDataAccessModule],
  providers: [ApiTransactionDataAccessService],
  exports: [ApiTransactionDataAccessService],
})
export class ApiTransactionDataAccessModule {}
