import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserSearchUserInput {
  @Field({ nullable: true })
  query?: string
}
