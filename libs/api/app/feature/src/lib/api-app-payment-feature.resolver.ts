import { AppPayment } from '@mogami/api/app/data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppPayment)
export class ApiAppPaymentFeatureResolver {
  @ResolveField(() => Int, { nullable: true })
  processingDuration(@Parent() creation: AppPayment) {
    return creation?.solanaStart?.getTime() - creation?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  solanaDuration(@Parent() creation: AppPayment) {
    return creation?.solanaEnd?.getTime() - creation?.solanaStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  totalDuration(@Parent() creation: AppPayment) {
    return creation?.updatedAt?.getTime() - creation?.createdAt?.getTime()
  }
}
