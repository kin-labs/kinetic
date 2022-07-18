import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiClusterDataAccessService } from '@kin-kinetic/api/cluster/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiAppDataAccessModule],
  providers: [ApiClusterDataAccessService, ApiTransactionDataAccessService],
  exports: [ApiTransactionDataAccessService],
})
export class ApiTransactionDataAccessModule {}
