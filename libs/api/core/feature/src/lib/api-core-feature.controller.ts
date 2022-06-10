import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { OpenTelementrySdk } from '@mogami/api/core/util'
import { Controller, Get, Response } from '@nestjs/common'

@Controller()
export class ApiCoreFeatureController {
  constructor(private readonly service: ApiCoreDataAccessService) {}

  @Get('metrics')
  metrics(@Response() response) {
    return OpenTelementrySdk.getMetrics(response)
  }

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }
}
