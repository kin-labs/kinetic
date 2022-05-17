import { Field, InputType } from '@nestjs/graphql'
import { ClusterStatus } from '../entity/cluster-status.enum'

@InputType()
export class ClusterUpdateInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  endpoint?: string
  @Field(() => ClusterStatus, { nullable: true })
  status?: ClusterStatus
}
