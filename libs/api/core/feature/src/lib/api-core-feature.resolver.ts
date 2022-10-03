import { AdminConfig } from '@kin-kinetic/api/config/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Float, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiCoreFeatureResolver {
  constructor(private readonly service: ApiCoreDataAccessService) {}

  @Query(() => AdminConfig)
  adminConfig() {
    return this.service.config.adminConfig()
  }

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }
}
