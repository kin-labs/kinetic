import { Controller, Get } from '@nestjs/common'
import { ApiCoreDataAccessService, HealthCheckResponse } from '@mogami/api/core/data-access'
import { ApiResponse } from '@nestjs/swagger'

@Controller()
export class ApiCoreFeatureController {
  constructor(private readonly service: ApiCoreDataAccessService) {}

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }

  @Get('health-check')
  @ApiResponse({ type: HealthCheckResponse })
  healthCheck() {
    return this.service.healthCheck()
  }
}
