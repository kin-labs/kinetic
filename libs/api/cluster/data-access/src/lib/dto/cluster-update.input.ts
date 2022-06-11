import { Field, InputType } from '@nestjs/graphql'
import { ClusterStatus } from '../entity/cluster-status.enum'

@InputType()
export class ClusterUpdateInput {
  @Field({ nullable: true })
  enableStats?: boolean
  @Field({ nullable: true })
  endpoint?: string
  @Field({ nullable: true })
  explorer?: string
  @Field({ nullable: true })
  name?: string
  @Field(() => ClusterStatus, { nullable: true })
  status?: ClusterStatus
}
