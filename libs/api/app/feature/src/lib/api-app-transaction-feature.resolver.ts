import { ApiAppDataAccessService, AppTransaction } from '@kin-kinetic/api/app/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
export class ApiAppTransactionFeatureResolver {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() tx: AppTransaction) {
    return this.service.explorerUrl(tx)
  }
}
