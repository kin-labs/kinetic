import { Transaction } from '@kin-kinetic/api/transaction/data-access'
import { Webhook, WebhookDirection, WebhookType } from '@kin-kinetic/api/webhook/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Transaction)
export class ApiWebhookTransactionFeatureResolver {
  @ResolveField(() => Webhook, { nullable: true })
  webhookEventIncoming(@Parent() tx: Transaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Incoming && type === WebhookType.Event,
    )
  }

  @ResolveField(() => Webhook, { nullable: true })
  webhookEventOutgoing(@Parent() tx: Transaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Outgoing && type === WebhookType.Event,
    )
  }

  @ResolveField(() => Webhook, { nullable: true })
  webhookVerifyIncoming(@Parent() tx: Transaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Incoming && type === WebhookType.Verify,
    )
  }

  @ResolveField(() => Webhook, { nullable: true })
  webhookVerifyOutgoing(@Parent() tx: Transaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === WebhookDirection.Outgoing && type === WebhookType.Verify,
    )
  }
}
