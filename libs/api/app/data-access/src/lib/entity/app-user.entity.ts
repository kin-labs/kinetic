import { User } from '@mogami/api/user/data-access'
import { Field, ObjectType } from '@nestjs/graphql'
import { AppUserRole } from './app-user-role.enum'

@ObjectType()
export class AppUser {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => AppUserRole)
  role: AppUserRole
  @Field(() => User, { nullable: true })
  user: User
}
