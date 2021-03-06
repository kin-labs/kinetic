import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { OpenTelementrySdk } from '@kin-kinetic/api/core/util'
import { Controller, Get, Response } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

@Controller()
export class ApiCoreFeatureController {
  constructor(private readonly service: ApiCoreDataAccessService) {}

  @Get('metrics')
  @ApiExcludeEndpoint()
  metrics(@Response() response) {
    return OpenTelementrySdk.getMetrics(response)
  }

  @Get('uptime')
  @ApiExcludeEndpoint()
  uptime() {
    return this.service.uptime()
  }
}
