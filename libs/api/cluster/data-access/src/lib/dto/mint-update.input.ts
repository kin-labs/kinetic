import { Field, InputType, Int } from '@nestjs/graphql'
import { MintType } from '../entity/mint-type.enum'

@InputType()
export class MintUpdateInput {
  @Field({ nullable: true })
  address: string
  @Field({ nullable: true })
  coingeckoId?: string | null
  @Field(() => Int, { nullable: true })
  decimals: number
  @Field({ nullable: true })
  logoUrl?: string | null
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  symbol: string
  @Field(() => MintType, { nullable: true })
  type: MintType
}
