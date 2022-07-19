import { Wallet } from '@kin-kinetic/api/wallet/data-access'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Mint } from '@kin-kinetic/api/cluster/data-access'

@ObjectType()
export class AppMint {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => Boolean, { nullable: true })
  addMemo?: boolean
  @Field(() => Int, { nullable: true })
  order?: number
  @Field(() => Mint, { nullable: true })
  mint: Mint
  @Field(() => Wallet, { nullable: true })
  wallet: Wallet
}
