import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '../entity/cluster-type.enum'

@InputType()
export class ClusterCreateInput {
  @Field()
  name: string
  @Field()
  endpoint: string
  @Field(() => ClusterType)
  type: ClusterType
}
