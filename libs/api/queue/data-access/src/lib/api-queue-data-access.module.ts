import { Module } from '@nestjs/common'
import { ApiQueueDataAccessService } from './api-queue-data-access.service'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiQueueDataAccessService],
  exports: [ApiQueueDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiQueueDataAccessModule {}
