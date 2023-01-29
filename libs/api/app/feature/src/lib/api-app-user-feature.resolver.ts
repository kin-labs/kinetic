import {
  ApiAppUserService,
  App,
  AppEnv,
  AppMint,
  AppUserRole,
  UserAppEnvCreateInput,
  UserAppEnvUpdateInput,
  UserAppMintUpdateInput,
  UserAppUpdateInput,
  UserAppUserAddInput,
  UserAppUserRemoveInput,
  UserAppUserUpdateRoleInput,
} from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'

@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppUserFeatureResolver {
  constructor(private readonly service: ApiAppUserService) {}

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
  @Query(() => [App], { nullable: true })
  userApps(@CtxUser() user: User) {
    return this.service.userApps(user.id)
  }

  @Mutation(() => App, { nullable: true })
  userUpdateApp(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: UserAppUpdateInput) {
    return this.service.userUpdateApp(user.id, appId, input)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userCreateAppEnv(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('clusterId') clusterId: string,
    @Args('input') input: UserAppEnvCreateInput,
  ) {
    return this.service.userCreateAppEnv(user.id, appId, clusterId, input)
  }

  @Mutation(() => AppEnv, { nullable: true })
  userUpdateAppEnv(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('input') input: UserAppEnvUpdateInput,
  ) {
    return this.service.userUpdateAppEnv(user.id, appId, appEnvId, input)
  }

  @Mutation(() => AppMint, { nullable: true })
  userUpdateAppMint(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appMintId') appMintId: string,
    @Args('input') input: UserAppMintUpdateInput,
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
  userAppUserAdd(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: UserAppUserAddInput) {
    return this.service.userAppUserAdd(user.id, appId, input)
  }

  @Mutation(() => App, { nullable: true })
  userAppUserRemove(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: UserAppUserRemoveInput) {
    return this.service.userAppUserRemove(user.id, appId, input)
  }

  @Mutation(() => App, { nullable: true })
  userAppUserUpdateRole(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('input') input: UserAppUserUpdateRoleInput,
  ) {
    return this.service.userAppUserUpdateRole(user.id, appId, input)
  }
}
