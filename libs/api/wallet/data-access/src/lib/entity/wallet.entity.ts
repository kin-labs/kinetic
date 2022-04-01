import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Wallet {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field({ nullable: true })
  publicKey: string
}
