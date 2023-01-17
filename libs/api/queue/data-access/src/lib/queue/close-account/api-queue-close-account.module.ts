import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { QueueType } from '../../entity/queue-type.enum'
import { ApiQueueCloseAccountProcessor } from './api-queue-close-account.processor'
import { ApiQueueCloseAccountService } from './api-queue-close-account.service'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    ApiKineticDataAccessModule,
    BullModule.registerQueue({
      name: QueueType.CloseAccount,
    }),
  ],
  providers: [ApiQueueCloseAccountProcessor, ApiQueueCloseAccountService],
  exports: [ApiQueueCloseAccountService],
})
export class ApiQueueCloseAccountModule {}
