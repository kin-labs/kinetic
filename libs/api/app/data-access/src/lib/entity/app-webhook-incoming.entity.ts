import { Field, ObjectType } from '@nestjs/graphql'
import { AppWebhookType } from '@prisma/client'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class AppWebhookIncoming {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => GraphQLJSON)
  headers?: any
  @Field(() => GraphQLJSON)
  payload?: any
  @Field(() => AppWebhookType)
  type: AppWebhookType
}
