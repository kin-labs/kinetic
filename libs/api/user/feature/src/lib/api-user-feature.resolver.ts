import { AppUser } from '@kin-kinetic/api/app/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
export class ApiUserFeatureResolver {
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
