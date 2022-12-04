import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class Job {
  @Field(() => String, { nullable: true })
  id: string
  @Field(() => GraphQLJSON, { nullable: true })
  data: unknown
  @Field(() => GraphQLJSON, { nullable: true })
  opts: unknown
  @Field(() => Int, { nullable: true })
  attemptsMade: number
  @Field(() => Int, { nullable: true })
  processedOn?: number | undefined
  @Field(() => Int, { nullable: true })
  finishedOn?: number | undefined
  @Field(() => Int, { nullable: true })
  timestamp: number
  @Field(() => String, { nullable: true })
  name: string
  @Field(() => [String], { nullable: true })
  stacktrace: string[]
  @Field(() => GraphQLJSON, { nullable: true })
  returnvalue: unknown
  @Field(() => String, { nullable: true })
  failedReason?: string | undefined
}
