import { AppUser } from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard } from '@kin-kinetic/api/auth/data-access'
import { ApiUserUserDataAccessService, User, UserSearchUserInput } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserUserFeatureResolver {
  constructor(private readonly service: ApiUserUserDataAccessService) {}

  @Query(() => [User], { nullable: true })
  userSearchUsers(@Args('input') input: UserSearchUserInput) {
    return this.service.userSearchUsers(input)
  }

  @ResolveField(() => [AppUser], { nullable: true })
  apps(@Parent() user: User) {
    return user?.apps
  }

  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user?.avatarUrl || 'https://avatars.githubusercontent.com/u/82999948?v=4'
  }

  @ResolveField(() => String, { nullable: true })
  email(@Parent() user: User) {
    return user?.emails?.length ? user.emails[0].email : null
  }

  @ResolveField(() => String, { nullable: true })
  name(@Parent() user: User) {
    return user?.name || user?.username || 'Unknown'
  }
}
