import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

import { WebhookDirection } from './webhook-direction.enum'
import { WebhookType } from './webhook-type.enum'

@ObjectType()
export class Webhook {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => WebhookDirection)
  direction: WebhookDirection
  @Field(() => GraphQLJSON, { nullable: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any
  @Field(() => GraphQLJSON, { nullable: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
  @Field(() => GraphQLJSON, { nullable: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsePayload: any
  @Field({ nullable: true })
  responseError: string
  @Field(() => Int, { nullable: true })
  responseStatus: number
  @Field(() => WebhookType)
  type: WebhookType
}
