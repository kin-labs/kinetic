import {
  ApiAppDataAccessService,
  App,
  AppCreateInput,
  AppUpdateInput,
  AppUserAddInput,
  AppUserRemoveInput,
  AppUserUpdateRoleInput,
} from '@mogami/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { User } from '@mogami/api/user/data-access'
import { Wallet } from '@mogami/api/wallet/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => App)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppFeatureResolver {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Mutation(() => App, { nullable: true })
  createApp(@CtxUser() user: User, @Args('input') input: AppCreateInput) {
    return this.service.createApp(user.id, input)
  }

  @Mutation(() => App, { nullable: true })
  deleteApp(@CtxUser() user: User, @Args('appId') appId: string) {
    return this.service.deleteApp(user.id, appId)
  }

  @Query(() => [App], { nullable: true })
  apps(@CtxUser() user: User) {
    return this.service.apps(user.id)
  }

  @Query(() => App, { nullable: true })
  app(@CtxUser() user: User, @Args('appId') appId: string) {
    return this.service.app(user.id, appId)
  }

  @Mutation(() => App, { nullable: true })
  appUserAdd(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AppUserAddInput) {
    return this.service.appUserAdd(user.id, appId, input)
  }

  @Mutation(() => App, { nullable: true })
  appUserRemove(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AppUserRemoveInput) {
    return this.service.appUserRemove(user.id, appId, input)
  }

  @Mutation(() => App, { nullable: true })
  appUserUpdateRole(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AppUserUpdateRoleInput) {
    return this.service.appUserUpdateRole(user.id, appId, input)
  }

  @Mutation(() => App, { nullable: true })
  appWalletAdd(@CtxUser() user: User, @Args('appId') appId: string, @Args('walletId') walletId: string) {
    return this.service.appWalletAdd(user.id, appId, walletId)
  }

  @Mutation(() => App, { nullable: true })
  appWalletRemove(@CtxUser() user: User, @Args('appId') appId: string, @Args('walletId') walletId: string) {
    return this.service.appWalletRemove(user.id, appId, walletId)
  }

  @Mutation(() => App, { nullable: true })
  updateApp(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AppUpdateInput) {
    return this.service.updateApp(user.id, appId, input)
  }

  @ResolveField(() => Wallet, { nullable: true })
  wallet(@Parent() app: App) {
    return app.wallet
  }
}
