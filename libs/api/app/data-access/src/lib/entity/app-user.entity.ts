import { User } from '@kin-kinetic/api/user/data-access'
import { Field, ObjectType } from '@nestjs/graphql'
import { AppUserRole } from './app-user-role.enum'
import { App } from './app.entity'

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
  @Field(() => App, { nullable: true })
  app: App
  @Field(() => User, { nullable: true })
  user: User
}
