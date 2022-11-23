import { AppEnv } from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { ApiClusterUserDataAccessService, Cluster } from '@kin-kinetic/api/cluster/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Cluster)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiClusterUserFeatureResolver {
  constructor(private readonly service: ApiClusterUserDataAccessService) {}

  @Query(() => [Cluster], { nullable: true })
  userClusters() {
    return this.service.userClusters()
  }

  @Query(() => Cluster, { nullable: true })
  userCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.userCluster(user.id, clusterId)
  }

  @ResolveField(() => [AppEnv], { nullable: true })
  envs(@Parent() cluster: Cluster) {
    return cluster.envs
  }
}
