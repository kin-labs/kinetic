import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AppEnvTransactionCount {
  @Field(() => Int, { nullable: true })
  Committed?: number
  @Field(() => Int, { nullable: true })
  Confirmed?: number
  @Field(() => Int, { nullable: true })
  Failed?: number
  @Field(() => Int, { nullable: true })
  Finalized?: number
  @Field(() => Int, { nullable: true })
  Processing?: number
}
