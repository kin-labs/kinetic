import { AppEnv } from '@kin-kinetic/api/app/data-access'
import { CtxUser } from '@kin-kinetic/api/auth/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { Wallet } from '@kin-kinetic/api/wallet/data-access'
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql'

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

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvAddBlockedIp(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('ip') ip: string) {
    return this.service.userAppEnvAddBlockedIp(user.id, appEnvId, ip)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvRemoveBlockedIp(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('ip') ip: string) {
    return this.service.userAppEnvRemoveBlockedIp(user.id, appEnvId, ip)
  }
}
