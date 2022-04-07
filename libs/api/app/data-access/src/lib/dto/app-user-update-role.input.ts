import { Field, InputType } from '@nestjs/graphql'
import { AppUserRole } from '../entity/app-user-role.enum'

@InputType()
export class AppUserUpdateRoleInput {
  @Field()
  appUserId: string
  @Field(() => AppUserRole)
  role: AppUserRole
}
