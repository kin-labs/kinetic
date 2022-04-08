import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { UserEmail } from './user-email.entity'
import { UserRole } from './user-role.enum'

@ObjectType()
export class User {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field({ nullable: true })
  name?: string
  @Field()
  username?: string
  avatarUrl?: string

  @Field(() => [UserEmail], { nullable: true })
  emails: UserEmail[]

  @Field(() => UserRole, { nullable: true })
  role: UserRole

  @HideField()
  apps?: any
}
