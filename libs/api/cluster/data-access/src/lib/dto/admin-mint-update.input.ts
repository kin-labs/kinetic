import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminMintUpdateInput {
  @Field({ nullable: true })
  addMemo?: boolean
  @Field(() => Int, { nullable: true })
  airdropAmount?: number
  @Field(() => Int, { nullable: true })
  airdropMax?: number
  @Field({ nullable: true })
  airdropSecretKey: string
  @Field({ nullable: true })
  default?: boolean
  @Field({ nullable: true })
  enabled?: boolean
  @Field({ nullable: true })
  address: string
  @Field({ nullable: true })
  coinGeckoId?: string | null
  @Field(() => Int, { nullable: true })
  decimals: number
  @Field({ nullable: true })
  logoUrl?: string | null
  @Field({ nullable: true })
  name: string
  @Field(() => Int, { nullable: true })
  order?: number
  @Field({ nullable: true })
  symbol: string
}
