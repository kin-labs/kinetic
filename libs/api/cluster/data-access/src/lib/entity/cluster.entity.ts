import { Field, ObjectType } from '@nestjs/graphql'
import { ClusterStatus } from './cluster-status.enum'
import { ClusterType } from './cluster-type.enum'
import { Mint } from './mint.entity'

@ObjectType()
export class Cluster {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
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
  @Field(() => ClusterType, { nullable: true })
  type?: ClusterType
  @Field(() => [Mint], { nullable: true })
  mints?: Mint[]
}
