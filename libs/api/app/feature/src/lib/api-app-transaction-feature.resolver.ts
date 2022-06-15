import {
  ApiAppDataAccessService,
  AppTransaction,
  AppWebhook,
  AppWebhookDirection,
  AppWebhookType,
} from '@kin-kinetic/api/app/data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiAppTransactionFeatureResolver {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() tx: AppTransaction) {
    return this.service.explorerUrl(tx)
  }

  @ResolveField(() => Int, { nullable: true })
  processingDuration(@Parent() tx: AppTransaction) {
    return this.service.processingDuration(tx)
  }

  @ResolveField(() => Int, { nullable: true })
  solanaCommittedDuration(@Parent() tx: AppTransaction) {
    return this.service.solanaCommittedDuration(tx)
  }

  @ResolveField(() => Int, { nullable: true })
  solanaFinalizedDuration(@Parent() tx: AppTransaction) {
    return this.service.solanaFinalizedDuration(tx)
  }

  @ResolveField(() => Int, { nullable: true })
  totalDuration(@Parent() tx: AppTransaction) {
    return this.service.totalDuration(tx)
  }

  @ResolveField(() => Int, { nullable: true })
  webhookEventDuration(@Parent() tx: AppTransaction) {
    return this.service.webhookEventDuration(tx)
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

  @ResolveField(() => Int, { nullable: true })
  webhookVerifyDuration(@Parent() tx: AppTransaction) {
    return this.service.webhookVerifyDuration(tx)
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
