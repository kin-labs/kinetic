import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserAppUserRemoveInput {
  @Field()
  userId: string
}
