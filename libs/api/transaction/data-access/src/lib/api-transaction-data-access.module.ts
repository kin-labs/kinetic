import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Module } from '@nestjs/common'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiWebhookDataAccessModule],
  providers: [ApiTransactionDataAccessService],
  exports: [ApiTransactionDataAccessService],
})
export class ApiTransactionDataAccessModule {}
