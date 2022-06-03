import { AppEnv } from '@mogami/api/app/data-access'
import { Wallet } from '@mogami/api/wallet/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppEnv)
export class ApiAppEnvFeatureResolver {
  @ResolveField(() => [Wallet], { nullable: true })
  wallets(@Parent() appEnv: AppEnv) {
    return appEnv.wallets
  }
}
