import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AppPaymentStatus } from './app-payment-status.enum'

@ObjectType()
export class AppPayment {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => Int)
  amount?: number
  @Field()
  destination?: string
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
  @Field(() => AppPaymentStatus)
  status: AppPaymentStatus
}
