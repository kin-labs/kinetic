import { Controller, Get } from '@nestjs/common'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'

@Controller()
export class ApiCoreFeatureController {
  constructor(private readonly service: ApiCoreDataAccessService) {}

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }
}
