import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { ApiUserDataAccessService, User, UserCreateInput, UserUpdateInput } from '@mogami/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserAdminFeatureResolver {
  constructor(private readonly service: ApiUserDataAccessService) {}

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@CtxUser() user: User, @Args('input') input: UserCreateInput) {
    return this.service.adminCreateUser(user.id, input)
  }

  @Mutation(() => User, { nullable: true })
  adminDeleteUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.adminDeleteUser(user.id, userId)
  }

  @Query(() => [User], { nullable: true })
  adminUsers(@CtxUser() user: User) {
    return this.service.adminUsers(user.id)
  }

  @Query(() => User, { nullable: true })
  adminUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.adminUser(user.id, userId)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@CtxUser() user: User, @Args('userId') userId: string, @Args('input') input: UserUpdateInput) {
    return this.service.updateUser(user.id, userId, input)
  }
}
