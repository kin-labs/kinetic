import { AppTransaction } from '@mogami/api/app/data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiAppTransactionFeatureResolver {
  @ResolveField(() => Int, { nullable: true })
  processingDuration(@Parent() tx: AppTransaction) {
    return tx?.solanaStart?.getTime() - tx?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  solanaDuration(@Parent() tx: AppTransaction) {
    return tx?.solanaEnd?.getTime() - tx?.solanaStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  totalDuration(@Parent() tx: AppTransaction) {
    return tx?.updatedAt?.getTime() - tx?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  webhookEventDuration(@Parent() tx: AppTransaction) {
    return tx?.webhookEventEnd?.getTime() - tx?.webhookEventStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  webhookVerifyDuration(@Parent() tx: AppTransaction) {
    return tx?.webhookVerifyEnd?.getTime() - tx?.webhookVerifyStart?.getTime()
  }
}
