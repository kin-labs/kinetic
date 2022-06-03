import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AppUpdateInput {
  @Field({ nullable: true })
  name?: string
}
