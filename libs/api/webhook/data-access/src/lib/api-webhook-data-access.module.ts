import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ApiWebhookDataAccessService } from './api-webhook-data-access.service'

@Module({
  providers: [ApiWebhookDataAccessService],
  exports: [ApiWebhookDataAccessService],
  imports: [ApiCoreDataAccessModule, HttpModule],
})
export class ApiWebhookDataAccessModule {}
