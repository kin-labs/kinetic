import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AppTransactionStatus } from './app-transaction-status.enum'

@ObjectType()
export class AppTransaction {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Int, { nullable: true })
  amount?: number
  @Field({ nullable: true })
  destination?: string
  @Field(() => GraphQLJSON, { nullable: true })
  errors?: any
  @Field({ nullable: true })
  feePayer?: string
  @Field({ nullable: true })
  mint?: string
  @Field({ nullable: true })
  signature?: string
  @Field({ nullable: true })
  solanaStart?: Date
  @Field({ nullable: true })
  solanaEnd?: Date
  @Field({ nullable: true })
  source?: string
  @Field(() => AppTransactionStatus)
  status: AppTransactionStatus
}
