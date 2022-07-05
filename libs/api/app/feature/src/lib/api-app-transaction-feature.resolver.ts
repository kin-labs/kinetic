import {
  ApiAppDataAccessService,
  AppTransaction,
  AppWebhook,
  AppWebhookDirection,
  AppWebhookType,
} from '@kin-kinetic/api/app/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiAppTransactionFeatureResolver {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() tx: AppTransaction) {
    return this.service.explorerUrl(tx)
  }

  @ResolveField(() => AppWebhook, { nullable: true })
  webhookEventIncoming(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === AppWebhookDirection.Incoming && type === AppWebhookType.Event,
    )
  }

  @ResolveField(() => AppWebhook, { nullable: true })
  webhookEventOutgoing(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === AppWebhookDirection.Outgoing && type === AppWebhookType.Event,
    )
  }

  @ResolveField(() => AppWebhook, { nullable: true })
  webhookVerifyIncoming(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === AppWebhookDirection.Incoming && type === AppWebhookType.Verify,
    )
  }

  @ResolveField(() => AppWebhook, { nullable: true })
  webhookVerifyOutgoing(@Parent() tx: AppTransaction) {
    return tx.webhooks?.find(
      ({ direction, type }) => direction === AppWebhookDirection.Outgoing && type === AppWebhookType.Verify,
    )
  }
}
