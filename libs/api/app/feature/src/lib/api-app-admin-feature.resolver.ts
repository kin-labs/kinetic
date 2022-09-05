import {
  ApiAppAdminDataAccessService,
  App,
  AdminAppCreateInput,
  AdminAppUpdateInput,
} from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'

@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppAdminFeatureResolver {
  constructor(private readonly service: ApiAppAdminDataAccessService) {}

  @Mutation(() => App, { nullable: true })
  adminCreateApp(@CtxUser() user: User, @Args('input') input: AdminAppCreateInput) {
    return this.service.adminCreateApp(user.id, input)
  }

  @Mutation(() => App, { nullable: true })
  adminUpdateApp(@CtxUser() user: User, @Args('appId') appId: string, @Args('input') input: AdminAppUpdateInput) {
    return this.service.adminUpdateApp(user.id, appId, input)
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
