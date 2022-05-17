import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import {
  ApiClusterDataAccessService,
  ClusterToken,
  ClusterTokenInput,
  MintAddInput,
} from '@mogami/api/cluster/data-access'
import { User } from '@mogami/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { ClusterCreateInput, ClusterUpdateInput, Cluster } from '@mogami/api/cluster/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiClusterFeatureResolver {
  constructor(private readonly service: ApiClusterDataAccessService) {}

  @Mutation(() => Cluster, { nullable: true })
  addClusterMint(@CtxUser() user: User, @Args('input') input: MintAddInput) {
    return this.service.addClusterMint(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  createCluster(@CtxUser() user: User, @Args('input') input: ClusterCreateInput) {
    return this.service.createCluster(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  deleteCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.deleteCluster(user.id, clusterId)
  }

  @Query(() => [Cluster], { nullable: true })
  clusters(@CtxUser() user: User) {
    return this.service.clusters(user.id)
  }

  @Query(() => Cluster, { nullable: true })
  cluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.cluster(user.id, clusterId)
  }

  @Query(() => [ClusterToken], { nullable: true })
  clusterTokens(@CtxUser() user: User, @Args('input') input: ClusterTokenInput) {
    return this.service.clusterTokens(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  updateCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string, @Args('input') input: ClusterUpdateInput) {
    return this.service.updateCluster(user.id, clusterId, input)
  }
}
