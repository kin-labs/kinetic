import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'
import { UserIdentityType } from './user-identity-type.enum'

@ObjectType()
export class UserIdentity {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => UserIdentityType, { nullable: true })
  type: UserIdentityType
  @Field()
  externalId: string
  @Field(() => GraphQLJSON)
  profile: unknown
}
