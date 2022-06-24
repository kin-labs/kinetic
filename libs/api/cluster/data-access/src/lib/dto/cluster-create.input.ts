import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '../entity/cluster-type.enum'

@InputType()
export class ClusterCreateInput {
  @Field({ nullable: true })
  explorer?: string
  @Field()
  name: string
  @Field()
  endpointPrivate: string
  @Field()
  endpointPublic: string
  @Field(() => ClusterType)
  type: ClusterType
}
