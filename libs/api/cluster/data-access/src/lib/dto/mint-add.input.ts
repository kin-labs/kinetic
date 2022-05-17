import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '../entity/cluster-type.enum'

@InputType()
export class MintAddInput {
  @Field()
  address: string
  @Field()
  name: string
  @Field()
  symbol: string
  @Field()
  clusterId: string
}
