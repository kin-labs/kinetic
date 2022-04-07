import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class WalletBalance {
  @Field(() => Float, { nullable: true })
  sol?: number
}
