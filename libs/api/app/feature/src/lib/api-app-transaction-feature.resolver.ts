import { AppTransaction } from '@mogami/api/app/data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiAppTransactionFeatureResolver {
  @ResolveField(() => Int, { nullable: true })
  processingDuration(@Parent() creation: AppTransaction) {
    return creation?.solanaStart?.getTime() - creation?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  solanaDuration(@Parent() creation: AppTransaction) {
    return creation?.solanaEnd?.getTime() - creation?.solanaStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  totalDuration(@Parent() creation: AppTransaction) {
    return creation?.updatedAt?.getTime() - creation?.createdAt?.getTime()
  }
}
