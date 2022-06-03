import { ApiAuthGraphqlGuard } from '@mogami/api/auth/data-access'
import { ApiClusterStatDataAccessService, ClusterStat } from '@mogami/api/cluster/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => ClusterStat)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiClusterStatFeatureResolver {
  constructor(private readonly service: ApiClusterStatDataAccessService) {}

  @Query(() => ClusterStat, { nullable: true })
  clusterStat(@Args('clusterStatId') clusterStatId: string) {
    return this.service.clusterStat(clusterStatId)
  }

  @Query(() => [ClusterStat], { nullable: true })
  clusterStats() {
    return this.service.clusterStats()
  }
}
