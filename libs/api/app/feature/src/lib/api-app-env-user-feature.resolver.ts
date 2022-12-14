import { ApiAppEnvUserDataAccessService, AppEnv, AppEnvStats } from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { TransactionStatus } from '@kin-kinetic/api/transaction/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { Wallet } from '@kin-kinetic/api/wallet/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppEnv)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppEnvUserFeatureResolver {
  constructor(private readonly service: ApiAppEnvUserDataAccessService) {}

  @Query(() => AppEnvStats, { nullable: true })
  userAppEnvStats(@Args('appEnvId') appEnvId: string) {
    return this.service.userAppEnvStats(appEnvId)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvAddAllowedIp(@Args('appEnvId') appEnvId: string, @Args('ip') ip: string) {
    return this.service.userAppEnvAddAllowedIp(appEnvId, ip)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvAddAllowedUa(@Args('appEnvId') appEnvId: string, @Args('ua') ua: string) {
    return this.service.userAppEnvAddAllowedUa(appEnvId, ua)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvAddBlockedUa(@Args('appEnvId') appEnvId: string, @Args('ua') ua: string) {
    return this.service.userAppEnvAddBlockedUa(appEnvId, ua)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvAddBlockedIp(@Args('appEnvId') appEnvId: string, @Args('ip') ip: string) {
    return this.service.userAppEnvAddBlockedIp(appEnvId, ip)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvRemoveAllowedIp(@Args('appEnvId') appEnvId: string, @Args('ip') ip: string) {
    return this.service.userAppEnvRemoveAllowedIp(appEnvId, ip)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvRemoveAllowedUa(@Args('appEnvId') appEnvId: string, @Args('ua') ua: string) {
    return this.service.userAppEnvRemoveAllowedUa(appEnvId, ua)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvRemoveBlockedIp(@Args('appEnvId') appEnvId: string, @Args('ip') ip: string) {
    return this.service.userAppEnvRemoveBlockedIp(appEnvId, ip)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvRemoveBlockedUa(@Args('appEnvId') appEnvId: string, @Args('ua') ua: string) {
    return this.service.userAppEnvRemoveBlockedUa(appEnvId, ua)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvPurgeTransactions(
    @Args('appEnvId') appEnvId: string,
    @Args('status', { type: () => TransactionStatus, nullable: true }) status: TransactionStatus,
  ) {
    return this.service.userAppEnvPurgeTransactions(appEnvId, status)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userDeleteAppEnv(@CtxUser() user: User, @Args('appId') appId: string, @Args('appEnvId') appEnvId: string) {
    return this.service.userDeleteAppEnv(user.id, appId, appEnvId)
  }

  @ResolveField(() => String, { nullable: true })
  endpoint() {
    return this.service.getEndpoint()
  }

  @ResolveField(() => String, { nullable: true })
  key(@Parent() appEnv: AppEnv) {
    return getAppKey(appEnv?.name, appEnv?.app?.index)
  }

  @ResolveField(() => [Wallet], { nullable: true })
  wallets(@Parent() appEnv: AppEnv) {
    return appEnv.wallets
  }
}
