import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminAppUpdateInput {
  @Field(() => Int, { nullable: true })
  index?: number

  @Field(() => Int, { nullable: true })
  maxEnvs?: number

  @Field({ nullable: true })
  name?: string
}
