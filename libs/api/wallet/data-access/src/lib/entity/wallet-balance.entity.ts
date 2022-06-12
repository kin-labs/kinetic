import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { GraphQLBigInt } from 'graphql-scalars'

@ObjectType()
export class WalletBalance {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => GraphQLBigInt, { nullable: true })
  balance?: bigint
  @Field(() => GraphQLBigInt, { nullable: true })
  change?: bigint
  @HideField()
  appEnv?
}
