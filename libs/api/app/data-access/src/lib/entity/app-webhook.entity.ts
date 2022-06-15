import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AppTransaction } from './app-transaction.entity'
import { AppWebhookDirection } from './app-webhook-direction.enum'
import { AppWebhookType } from './app-webhook-type.enum'

import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class AppWebhook {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => AppWebhookDirection)
  direction: AppWebhookDirection
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
  @Field(() => AppWebhookType)
  type: AppWebhookType
}
