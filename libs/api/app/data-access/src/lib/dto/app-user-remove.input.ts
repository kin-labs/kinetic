import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AppUserRemoveInput {
  @Field()
  userId: string
}
