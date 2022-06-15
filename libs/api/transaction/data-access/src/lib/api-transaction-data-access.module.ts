import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiAppDataAccessModule],
  providers: [ApiTransactionDataAccessService],
  exports: [ApiTransactionDataAccessService],
})
export class ApiTransactionDataAccessModule {}
