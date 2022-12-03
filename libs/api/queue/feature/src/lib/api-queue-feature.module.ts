import { Module } from '@nestjs/common'
import { ApiQueueFeatureController } from './api-queue-feature.controller'
import { ApiQueueDataAccessModule } from '@kin-kinetic/api/queue/data-access'

@Module({
  controllers: [ApiQueueFeatureController],
  providers: [],
  exports: [],
  imports: [ApiQueueDataAccessModule],
})
export class ApiQueueFeatureModule {}
