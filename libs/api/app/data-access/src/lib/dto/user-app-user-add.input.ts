import { Field, InputType } from '@nestjs/graphql'
import { AppUserRole } from '../entity/app-user-role.enum'

@InputType()
export class UserAppUserAddInput {
  @Field()
  userId: string
  @Field(() => AppUserRole)
  role: AppUserRole
}
