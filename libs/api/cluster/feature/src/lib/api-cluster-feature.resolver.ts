import {
  ApiClusterDataAccessService,
  ClusterToken,
  ClusterTokenInput,
  MintAddInput,
} from '@mogami/api/cluster/data-access'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { ClusterCreateInput, ClusterUpdateInput, Cluster } from '@mogami/api/cluster/data-access'

@Resolver()
export class ApiClusterFeatureResolver {
  constructor(private readonly service: ApiClusterDataAccessService) {}

  @Mutation(() => Cluster, { nullable: true })
  addClusterMint(@Args('input') input: MintAddInput) {
    return this.service.addClusterMint(input)
  }

  @Mutation(() => Cluster, { nullable: true })
  createCluster(@Args('input') input: ClusterCreateInput) {
    return this.service.createCluster(input)
  }

  @Mutation(() => Cluster, { nullable: true })
  deleteCluster(@Args('clusterId') clusterId: string) {
    return this.service.deleteCluster(clusterId)
  }

  @Query(() => [Cluster], { nullable: true })
  clusters() {
    return this.service.clusters()
  }

  @Query(() => Cluster, { nullable: true })
  cluster(@Args('clusterId') clusterId: string) {
    return this.service.cluster(clusterId)
  }

  @Query(() => [ClusterToken], { nullable: true })
  clusterTokens(@Args('input') input: ClusterTokenInput) {
    return this.service.clusterTokens(input)
  }

  @Mutation(() => Cluster, { nullable: true })
  updateCluster(@Args('clusterId') clusterId: string, @Args('input') input: ClusterUpdateInput) {
    return this.service.updateCluster(clusterId, input)
  }
}
