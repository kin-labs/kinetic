import { ApiAppEnvAdminDataAccessService, AppEnv } from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation } from '@nestjs/graphql'

@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppEnvAdminFeatureResolver {
  constructor(private readonly service: ApiAppEnvAdminDataAccessService) {}

  @Mutation(() => AppEnv, { nullable: true })
  adminDeleteAppEnv(@CtxUser() user: User, @Args('appId') appId: string, @Args('appEnvId') appEnvId: string) {
    return this.service.adminDeleteAppEnv(user.id, appId, appEnvId)
  }
}
