import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ApiWebhookService } from './api-webhook.service'

@Module({
  providers: [ApiWebhookService],
  exports: [ApiWebhookService],
  imports: [ApiCoreDataAccessModule, HttpModule],
})
export class ApiWebhookDataAccessModule {}
