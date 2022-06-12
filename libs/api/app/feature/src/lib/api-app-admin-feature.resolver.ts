import { ApiAppAdminDataAccessService, App, AppCreateInput } from '@mogami/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { User } from '@mogami/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'

@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppAdminFeatureResolver {
  constructor(private readonly service: ApiAppAdminDataAccessService) {}

  @Mutation(() => App, { nullable: true })
  adminCreateApp(@CtxUser() user: User, @Args('input') input: AppCreateInput) {
    return this.service.adminCreateApp(user.id, input)
  }

  @Mutation(() => App, { nullable: true })
  adminDeleteApp(@CtxUser() user: User, @Args('appId') appId: string) {
    return this.service.adminDeleteApp(user.id, appId)
  }

  @Query(() => [App], { nullable: true })
  adminApps(@CtxUser() user: User) {
    return this.service.adminApps(user.id)
  }

  @Query(() => App, { nullable: true })
  adminApp(@CtxUser() user: User, @Args('appId') appId: string) {
    return this.service.adminApp(user.id, appId)
  }
}
