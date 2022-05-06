import { Field, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AppCreationStatus } from './app-creation-status.enum'

@ObjectType()
export class AppCreation {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => GraphQLJSON)
  errors?: any
  @Field()
  feePayer?: string
  @Field()
  mint?: string
  @Field()
  signature?: string
  @Field()
  solanaStart?: Date
  @Field()
  solanaEnd?: Date
  @Field()
  source?: string
  @Field(() => AppCreationStatus)
  status: AppCreationStatus
}
