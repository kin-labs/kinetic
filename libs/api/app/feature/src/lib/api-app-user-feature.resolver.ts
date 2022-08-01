import {
  ApiAppUserDataAccessService,
  App,
  AppEnv,
  AppEnvUpdateInput,
  AppMint,
  AppMintUpdateInput,
  AppTransaction,
  AppTransactionCounter,
  AppTransactionListInput,
  AppUpdateInput,
  AppUserAddInput,
  AppUserRemoveInput,
  AppUserRole,
  AppUserUpdateRoleInput,
} from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'

@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppUserFeatureResolver {
  constructor(private readonly service: ApiAppUserDataAccessService) {}

  @Query(() => App, { nullable: true })
  userApp(@CtxUser() user: User, @Args('appId') appId: string) {
    return this.service.userApp(user.id, appId)
  }

  @Query(() => AppEnv, { nullable: true })
  userAppEnv(@CtxUser() user: User, @Args('appId') appId: string, @Args('appEnvId') appEnvId: string) {
    return this.service.userAppEnv(user.id, appId, appEnvId)
  }

  @Query(() => AppUserRole, { nullable: true })
  userAppRole(@CtxUser() user: User, @Args('appId') appId: string) {
    return this.service.userAppRole(user.id, appId)
  }

  @Query(() => AppTransaction, { nullable: true })
  userAppTransaction(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('appTransactionId') appTransactionId: string,
  ) {
    return this.service.userAppTransaction(user.id, appId, appEnvId, appTransactionId)
  }

  @Query(() => [AppTransaction], { nullable: true })
  userAppTransactions(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args({ name: 'input', type: () => AppTransactionListInput, nullable: true }) input: AppTransactionListInput,
  ) {
    return this.service.userAppTransactions(user.id, appId, appEnvId, input)
  }

  @Query(() => AppTransactionCounter, { nullable: true })
  userAppTransactionCounter(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args({ name: 'input', type: () => AppTransactionListInput, nullable: true }) input: AppTransactionListInput,
  ) {
    return this.service.userAppTransactionCounter(user.id, appId, appEnvId, input)
  }

  @Query(() => [App], { nullable: true })
  userApps(@CtxUser() user: User) {
    return this.service.userApps(user.id)
  }

  @Mutation(() => App, { nullable: true })
  userUpdateApp(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AppUpdateInput) {
    return this.service.userUpdateApp(user.id, appId, input)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userUpdateAppEnv(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('input') input: AppEnvUpdateInput,
  ) {
    return this.service.userUpdateAppEnv(user.id, appId, appEnvId, input)
  }

  @Mutation(() => AppMint, { nullable: true })
  userUpdateAppMint(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appMintId') appMintId: string,
    @Args('input') input: AppMintUpdateInput,
  ) {
    return this.service.userUpdateAppMint(user.id, appId, appMintId, input)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvMintDisable(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('mintId') mintId: string,
  ) {
    return this.service.userAppEnvMintDisable(user.id, appId, appEnvId, mintId)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvMintEnable(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('mintId') mintId: string,
  ) {
    return this.service.userAppEnvMintEnable(user.id, appId, appEnvId, mintId)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvMintSetWallet(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('mintId') mintId: string,
    @Args('walletId') walletId: string,
  ) {
    return this.service.userAppEnvMintSetWallet(user.id, appId, appEnvId, mintId, walletId)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvWalletAdd(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('walletId') walletId: string,
  ) {
    return this.service.userAppEnvWalletAdd(user.id, appId, appEnvId, walletId)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userAppEnvWalletRemove(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('walletId') walletId: string,
  ) {
    return this.service.userAppEnvWalletRemove(user.id, appId, appEnvId, walletId)
  }

  @Mutation(() => App, { nullable: true })
  userAppUserAdd(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AppUserAddInput) {
    return this.service.userAppUserAdd(user.id, appId, input)
  }

  @Mutation(() => App, { nullable: true })
  userAppUserRemove(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AppUserRemoveInput) {
    return this.service.userAppUserRemove(user.id, appId, input)
  }

  @Mutation(() => App, { nullable: true })
  userAppUserUpdateRole(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('input') input: AppUserUpdateRoleInput,
  ) {
    return this.service.userAppUserUpdateRole(user.id, appId, input)
  }
}
