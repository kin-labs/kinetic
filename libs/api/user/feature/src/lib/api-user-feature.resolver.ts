import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { ApiUserDataAccessService, User, UserCreateInput, UserUpdateInput } from '@mogami/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserFeatureResolver {
  constructor(private readonly service: ApiUserDataAccessService) {}

  @Mutation(() => User, { nullable: true })
  createUser(@CtxUser() user: User, @Args('input') input: UserCreateInput) {
    return this.service.createUser(user.id, input)
  }

  @Mutation(() => User, { nullable: true })
  deleteUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.deleteUser(user.id, userId)
  }

  @Query(() => [User], { nullable: true })
  users(@CtxUser() user: User) {
    return this.service.users(user.id)
  }

  @Query(() => User, { nullable: true })
  user(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.user(user.id, userId)
  }

  @Mutation(() => User, { nullable: true })
  updateUser(@CtxUser() user: User, @Args('userId') userId: string, @Args('input') input: UserUpdateInput) {
    return this.service.updateUser(user.id, userId, input)
  }

  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl || 'https://avatars.githubusercontent.com/u/82999948?v=4'
  }

  @ResolveField(() => String, { nullable: true })
  email(@Parent() user: User) {
    return user.emails.length ? user.emails[0].email : null
  }
}
