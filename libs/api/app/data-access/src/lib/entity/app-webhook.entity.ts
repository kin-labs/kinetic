import { Field, Int, ObjectType } from '@nestjs/graphql'
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
  headers?: any
  @Field(() => GraphQLJSON, { nullable: true })
  payload?: any
  @Field(() => GraphQLJSON, { nullable: true })
  responsePayload: any
  @Field({ nullable: true })
  responseError: string
  @Field(() => Int, { nullable: true })
  responseStatus: number
  @Field(() => AppWebhookType)
  type: AppWebhookType
}
