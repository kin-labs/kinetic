import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '../entity/cluster-type.enum'

@InputType()
export class ClusterTokenInput {
  @Field({ nullable: true })
  address?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  symbol?: string
  @Field(() => ClusterType)
  type: ClusterType
}
