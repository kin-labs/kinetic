import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
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
  addMemo?: boolean
  @Field({ nullable: true })
  address: string
  @Field(() => Int, { nullable: true })
  airdropAmount?: number
  @Field(() => Int, { nullable: true })
  airdropMax?: number
  @HideField()
  airdropSecretKey?: string
  @Field({ nullable: true })
  coinGeckoId?: string
  @Field(() => Int, { nullable: true })
  decimals: number
  @Field({ nullable: true })
  default?: boolean
  @Field({ nullable: true })
  enabled?: boolean
  @Field({ nullable: true })
  logoUrl?: string
  @Field({ nullable: true })
  name: string
  @Field(() => Int, { nullable: true })
  order?: number
  @Field({ nullable: true })
  symbol: string
  @Field(() => MintType, { nullable: true })
  type: MintType
}
