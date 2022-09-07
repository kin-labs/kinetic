import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Module } from '@nestjs/common'
import { ApiWebhookAppTransactionFeatureResolver } from './api-webhook-app-transaction-feature.resolver'
import { ApiWebhookFeatureController } from './api-webhook-feature.controller'

@Module({
  controllers: [ApiWebhookFeatureController],
  providers: [ApiWebhookAppTransactionFeatureResolver],
  imports: [ApiWebhookDataAccessModule],
})
export class ApiWebhookFeatureModule {}
