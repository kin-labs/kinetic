import {
  ApiAppDataAccessService,
  App,
  AppCreateInput,
  AppEnv,
  AppEnvUpdateInput,
  AppTransaction,
  AppUpdateInput,
  AppUserAddInput,
  AppUserRemoveInput,
  AppUserUpdateRoleInput,
  AppWebhook,
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

  @Query(() => AppEnv, { nullable: true })
  appEnv(@CtxUser() user: User, @Args('appId') appId: string, @Args('appEnvId') appEnvId: string) {
    return this.service.appEnv(user.id, appId, appEnvId)
  }

  @Query(() => AppTransaction, { nullable: true })
  appTransaction(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('appTransactionId') appTransactionId: string,
  ) {
    return this.service.appTransaction(user.id, appId, appEnvId, appTransactionId)
  }

  @Query(() => [AppTransaction], { nullable: true })
  appTransactions(@CtxUser() user: User, @Args('appId') appId: string, @Args('appEnvId') appEnvId: string) {
    return this.service.appTransactions(user.id, appId, appEnvId)
  }

  @Query(() => AppWebhook, { nullable: true })
  appWebhook(@CtxUser() user: User, @Args('appId') appId: string, @Args('appWebhookId') appWebhookId: string) {
    return this.service.appWebhook(user.id, appId, appWebhookId)
  }

  @Query(() => [AppWebhook], { nullable: true })
  appWebhooks(@CtxUser() user: User, @Args('appId') appId: string, @Args('appEnvId') appEnvId: string) {
    return this.service.appWebhooks(user.id, appId, appEnvId)
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

  @Mutation(() => AppEnv, { nullable: true })
  updateAppEnv(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('input') input: AppEnvUpdateInput,
  ) {
    return this.service.updateAppEnv(user.id, appId, appEnvId, input)
  }

  @ResolveField(() => [Wallet], { nullable: true })
  wallets(@Parent() app: App) {
    return app.wallets
  }
}
