import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class MintAddInput {
  @Field()
  address: string
  @Field()
  clusterId: string
  @Field({ nullable: true })
  coinGeckoId: string
  @Field(() => Int)
  decimals: number
  @Field({ nullable: true })
  logoUrl: string
  @Field()
  name: string
  @Field()
  symbol: string
}
