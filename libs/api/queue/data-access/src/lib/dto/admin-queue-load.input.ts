import { Field, InputType, Int } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'
import { QueueType } from '../entity/queue-type.enum'

@InputType()
export class AdminQueueLoadInput {
  @Field()
  environment: string
  @Field(() => Int)
  index: number
  @Field(() => GraphQLJSON)
  payload: unknown
  @Field(() => QueueType)
  type: QueueType
}
