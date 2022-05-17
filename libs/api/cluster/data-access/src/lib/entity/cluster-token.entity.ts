import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ClusterTokenExtensions } from './cluster-token-extensions.entity'

@ObjectType()
export class ClusterToken {
  @Field({ nullable: true })
  address?: string
  @Field({ nullable: true })
  name?: string
  @Field(() => Int, { nullable: true })
  decimals?: number
  @Field({ nullable: true })
  symbol?: string
  @Field({ nullable: true })
  logoURI?: string
  @Field(() => [String], { nullable: true })
  tags?: string[]
  @Field(() => ClusterTokenExtensions, { nullable: true })
  extensions?: ClusterTokenExtensions
}
