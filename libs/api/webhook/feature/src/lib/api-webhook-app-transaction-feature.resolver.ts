import { AppTransaction } from '@kin-kinetic/api/app/data-access'
import { Webhook, WebhookDirection, WebhookType } from '@kin-kinetic/api/webhook/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiWebhookAppTransactionFeatureResolver {
  @ResolveField(() => Webhook, { nullable: true })
  webhookEventIncoming(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Incoming && type === WebhookType.Event,
    )
  }

  @ResolveField(() => Webhook, { nullable: true })
  webhookEventOutgoing(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Outgoing && type === WebhookType.Event,
    )
  }

  @ResolveField(() => Webhook, { nullable: true })
  webhookVerifyIncoming(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Incoming && type === WebhookType.Verify,
    )
  }

  @ResolveField(() => Webhook, { nullable: true })
  webhookVerifyOutgoing(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Outgoing && type === WebhookType.Verify,
    )
  }
}
