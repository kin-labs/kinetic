import { WebConfig } from '@kin-kinetic/api/config/data-access'
import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Float, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiCoreFeatureResolver {
  constructor(private readonly service: ApiCoreService) {}

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }

  @Query(() => WebConfig)
  webConfig() {
    return this.service.config.webConfig()
  }
}
