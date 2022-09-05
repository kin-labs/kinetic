import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserAppUpdateInput {
  @Field({ nullable: true })
  name?: string
}
