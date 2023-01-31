import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { WebConfig } from '@kin-kinetic/api/config/data-access'
import { ApiCoreService, Migration, MigrationStatus } from '@kin-kinetic/api/core/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiCoreFeatureResolver {
  constructor(private readonly service: ApiCoreService) {}

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }

  @Query(() => WebConfig)
  webConfig() {
    return this.service.config.webConfig()
  }

  @UseGuards(ApiAuthGraphqlGuard)
  @Query(() => [Migration], { nullable: true })
  async adminMigrations(@CtxUser() user: User) {
    await this.service.ensureAdminUser(user.id)
    return this.service.migrations()
  }

  @UseGuards(ApiAuthGraphqlGuard)
  @Mutation(() => MigrationStatus, { nullable: true })
  async adminMigrate(@CtxUser() user: User, @Args('key') key: string) {
    await this.service.ensureAdminUser(user.id)
    return this.service.migrate(key)
  }
}
