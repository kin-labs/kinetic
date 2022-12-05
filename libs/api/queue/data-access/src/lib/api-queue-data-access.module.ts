import { ApiConfigDataAccessModule, ApiConfigDataAccessService } from '@kin-kinetic/api/config/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ApiQueueDataAccessService } from './api-queue-data-access.service'
import { ApiQueueCloseAccountModule } from './queue/account/api-queue-close-account.module'

@Module({
  controllers: [],
  providers: [ApiQueueDataAccessService],
  exports: [ApiQueueDataAccessService],
  imports: [
    ApiCoreDataAccessModule,
    ApiQueueCloseAccountModule,
    BullModule.forRootAsync({
      imports: [ApiConfigDataAccessModule],
      useFactory: async (config: ApiConfigDataAccessService) => ({
        redis: config.redisConfig,
      }),
      inject: [ApiConfigDataAccessService],
    }),
  ],
})
export class ApiQueueDataAccessModule {}
