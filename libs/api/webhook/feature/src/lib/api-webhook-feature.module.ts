import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Module } from '@nestjs/common'
import { ApiWebhookTransactionFeatureResolver } from './api-webhook-transaction-feature.resolver'
import { ApiWebhookFeatureController } from './api-webhook-feature.controller'

@Module({
  controllers: [ApiWebhookFeatureController],
  providers: [ApiWebhookTransactionFeatureResolver],
  imports: [ApiWebhookDataAccessModule],
})
export class ApiWebhookFeatureModule {}
