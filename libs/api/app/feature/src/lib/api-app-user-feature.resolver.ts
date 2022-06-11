import { ApiAppUserDataAccessService, App, AppEnv, AppUserRole } from '@mogami/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { User } from '@mogami/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query } from '@nestjs/graphql'

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

  @Query(() => [App], { nullable: true })
  userApps(@CtxUser() user: User) {
    return this.service.userApps(user.id)
  }
}
