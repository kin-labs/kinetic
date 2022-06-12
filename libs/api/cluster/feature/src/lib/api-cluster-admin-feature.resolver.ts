import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import {
  ApiClusterAdminDataAccessService,
  Cluster,
  ClusterCreateInput,
  ClusterToken,
  ClusterTokenInput,
  ClusterUpdateInput,
  MintAddInput,
} from '@mogami/api/cluster/data-access'
import { User } from '@mogami/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiClusterAdminFeatureResolver {
  constructor(private readonly service: ApiClusterAdminDataAccessService) {}

  @Mutation(() => Cluster, { nullable: true })
  adminAddClusterMint(@CtxUser() user: User, @Args('input') input: MintAddInput) {
    return this.service.addClusterMint(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  adminCreateCluster(@CtxUser() user: User, @Args('input') input: ClusterCreateInput) {
    return this.service.adminCreateCluster(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  adminDeleteCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.adminDeleteCluster(user.id, clusterId)
  }

  @Query(() => [Cluster], { nullable: true })
  adminClusters(@CtxUser() user: User) {
    return this.service.adminClusters(user.id)
  }

  @Query(() => Cluster, { nullable: true })
  adminCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.adminCluster(user.id, clusterId)
  }

  @Query(() => [ClusterToken], { nullable: true })
  adminClusterTokens(@CtxUser() user: User, @Args('input') input: ClusterTokenInput) {
    return this.service.adminClusterTokens(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  adminUpdateCluster(
    @CtxUser() user: User,
    @Args('clusterId') clusterId: string,
    @Args('input') input: ClusterUpdateInput,
  ) {
    return this.service.adminUpdateCluster(user.id, clusterId, input)
  }
}
