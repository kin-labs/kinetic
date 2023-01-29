import { ApiConfigDataAccessModule, ApiConfigService } from '@kin-kinetic/api/config/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ApiQueueService } from './api-queue.service'
import { ApiQueueCloseAccountModule } from './queue/close-account/api-queue-close-account.module'

@Module({
  controllers: [],
  providers: [ApiQueueService],
  exports: [ApiQueueService],
  imports: [
    ApiCoreDataAccessModule,
    ApiQueueCloseAccountModule,
    BullModule.forRootAsync({
      imports: [ApiConfigDataAccessModule],
      useFactory: async (config: ApiConfigService) => ({
        prefix: 'kinetic:queue',
        redis: config.redisOptions,
      }),
      inject: [ApiConfigService],
    }),
  ],
})
export class ApiQueueDataAccessModule {}
