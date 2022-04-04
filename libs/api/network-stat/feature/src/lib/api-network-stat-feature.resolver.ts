import { ApiAuthGraphqlGuard } from '@mogami/api/auth/data-access'
import { ApiNetworkStatDataAccessService, NetworkStat } from '@mogami/api/network-stat/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => NetworkStat)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiNetworkStatFeatureResolver {
  constructor(private readonly service: ApiNetworkStatDataAccessService) {}

  @Query(() => NetworkStat, { nullable: true })
  networkStat(@Args('networkStatId') networkStatId: string) {
    return this.service.networkStat(networkStatId)
  }

  @Query(() => [NetworkStat], { nullable: true })
  networkStats() {
    return this.service.networkStats()
  }
}
