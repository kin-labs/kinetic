import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserEmail {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field()
  email?: string
}
