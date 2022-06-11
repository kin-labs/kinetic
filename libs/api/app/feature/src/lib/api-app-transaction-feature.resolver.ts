import { ApiAppDataAccessService, AppTransaction } from '@mogami/api/app/data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiAppTransactionFeatureResolver {
  constructor(private readonly service: ApiAppDataAccessService) {}

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

  @ResolveField(() => Int, { nullable: true })
  webhookVerifyDuration(@Parent() tx: AppTransaction) {
    return this.service.webhookVerifyDuration(tx)
  }
}
