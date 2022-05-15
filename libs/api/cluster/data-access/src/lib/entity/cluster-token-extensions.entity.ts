import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ClusterTokenExtensions {
  @Field({ nullable: true })
  address?: string
  @Field({ nullable: true })
  assetContract?: string
  @Field({ nullable: true })
  bridgeContract?: string
  @Field({ nullable: true })
  coingeckoId?: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  discord?: string
  @Field({ nullable: true })
  explorer?: string
  @Field({ nullable: true })
  github?: string
  @Field({ nullable: true })
  imageUrl?: string
  @Field({ nullable: true })
  medium?: string
  @Field({ nullable: true })
  serumV3Usdc?: string
  @Field({ nullable: true })
  serumV3Usdt?: string
  @Field({ nullable: true })
  tgann?: string
  @Field({ nullable: true })
  tggroup?: string
  @Field({ nullable: true })
  twitter?: string
  @Field({ nullable: true })
  website?: string
}
