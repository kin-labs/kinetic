import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Module } from '@nestjs/common'

import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'
import { ApiTransactionUserDataAccessService } from './api-transaction-user-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule],
  providers: [ApiTransactionDataAccessService, ApiTransactionUserDataAccessService],
  exports: [ApiTransactionDataAccessService, ApiTransactionUserDataAccessService],
})
export class ApiTransactionDataAccessModule {}
