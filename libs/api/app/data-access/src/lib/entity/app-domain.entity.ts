import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AppDomain {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field()
  hostname?: string
}
