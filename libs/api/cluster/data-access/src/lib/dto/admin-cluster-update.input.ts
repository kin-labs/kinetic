import { Field, InputType } from '@nestjs/graphql'
import { ClusterStatus } from '../entity/cluster-status.enum'

@InputType()
export class AdminClusterUpdateInput {
  @Field({ nullable: true })
  enableStats?: boolean
  @Field({ nullable: true })
  endpointPrivate?: string
  @Field({ nullable: true })
  endpointPublic?: string
  @Field({ nullable: true })
  explorer?: string
  @Field({ nullable: true })
  name?: string
  @Field(() => ClusterStatus, { nullable: true })
  status?: ClusterStatus
}
