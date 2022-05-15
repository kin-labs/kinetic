import { Field, Int, ObjectType } from '@nestjs/graphql'
import { MintType } from './mint-type.enum'

@ObjectType()
export class Mint {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  address: string
  @Field({ nullable: true })
  coingeckoId?: string
  @Field(() => Int, { nullable: true })
  decimals: number
  @Field({ nullable: true })
  logoUrl?: string
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  symbol: string
  @Field(() => MintType, { nullable: true })
  type: MintType
}
