import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class ApiCoreFeatureController {
  constructor(private readonly service: ApiCoreDataAccessService) {}

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }
}
