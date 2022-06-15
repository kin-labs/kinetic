import { AppEnv } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Wallet } from '@kin-kinetic/api/wallet/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppEnv)
export class ApiAppEnvFeatureResolver {
  constructor(private readonly service: ApiCoreDataAccessService) {}
  @ResolveField(() => String, { nullable: true })
  key(@Parent() appEnv: AppEnv) {
    return this.service.getAppKey(appEnv?.name, appEnv?.app?.index)
  }
  @ResolveField(() => [Wallet], { nullable: true })
  wallets(@Parent() appEnv: AppEnv) {
    return appEnv.wallets
  }
}
