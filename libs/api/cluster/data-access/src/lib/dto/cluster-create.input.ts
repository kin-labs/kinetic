import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '../entity/cluster-type.enum'

@InputType()
export class ClusterCreateInput {
  @Field({ nullable: true })
  explorer?: string
  @Field()
  name: string
  @Field()
  endpoint: string
  @Field(() => ClusterType)
  type: ClusterType
}
