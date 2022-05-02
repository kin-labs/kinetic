import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class WalletBalance {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Int, { nullable: true })
  balance?: number
}
