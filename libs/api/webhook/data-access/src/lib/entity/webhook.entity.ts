import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

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
  headers?: unknown
  @Field(() => GraphQLJSON, { nullable: true })
  payload?: unknown
  @Field(() => GraphQLJSON, { nullable: true })
  responsePayload: unknown
  @Field({ nullable: true })
  responseError: string
  @Field(() => Int, { nullable: true })
  responseStatus: number
  @Field(() => WebhookType)
  type: WebhookType
}
