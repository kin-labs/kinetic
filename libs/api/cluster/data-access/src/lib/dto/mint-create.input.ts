import { Field, InputType, Int } from '@nestjs/graphql'
import { MintType } from '../entity/mint-type.enum'

@InputType()
export class MintCreateInput {
  @Field()
  address: string
  @Field({ nullable: true })
  coingeckoId?: string | null
  @Field(() => Int)
  decimals: number
  @Field({ nullable: true })
  logoUrl?: string | null
  @Field()
  name: string
  @Field()
  symbol: string
  @Field(() => MintType)
  type: MintType
  @Field()
  clusterId: string
}
