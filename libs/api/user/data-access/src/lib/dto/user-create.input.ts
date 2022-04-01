import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../entities/user-role.enum'

@InputType()
export class UserCreateInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  username?: string
  @Field({ nullable: true })
  avatarUrl?: string
  @Field()
  password: string
  @Field()
  email: string
  @Field(() => UserRole, { nullable: true })
  role: UserRole
}
