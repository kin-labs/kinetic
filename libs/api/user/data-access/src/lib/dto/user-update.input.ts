import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../entities/user-role.enum'

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  name?: string
  @Field(() => UserRole, { nullable: true })
  role: UserRole
}
