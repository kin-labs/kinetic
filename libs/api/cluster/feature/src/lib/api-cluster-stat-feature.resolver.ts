import { ApiClusterStatDataAccessService, ClusterStat } from '@mogami/api/cluster/data-access'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => ClusterStat)
export class ApiClusterStatFeatureResolver {
  constructor(private readonly service: ApiClusterStatDataAccessService) {}

  @Query(() => [ClusterStat], { nullable: true })
  clusterStats(@Args('clusterId') clusterId: string) {
    return this.service.clusterStats(clusterId)
  }
}
