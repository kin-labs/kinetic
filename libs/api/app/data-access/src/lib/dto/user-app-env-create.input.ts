import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserAppEnvCreateInput {
  @Field()
  name: string
}
