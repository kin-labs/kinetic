import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class QueueCount {
  @Field(() => Int, { nullable: true })
  active: number
  @Field(() => Int, { nullable: true })
  completed: number
  @Field(() => Int, { nullable: true })
  delayed: number
  @Field(() => Int, { nullable: true })
  failed: number
  @Field(() => Int, { nullable: true })
  paused: number
  @Field(() => Int, { nullable: true })
  waiting: number
}
