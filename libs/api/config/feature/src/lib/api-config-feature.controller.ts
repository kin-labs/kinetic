import { Controller, Get } from '@nestjs/common'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'

@Controller('config')
export class ApiConfigFeatureController {
  constructor(private readonly service: ApiConfigDataAccessService) {}

  @Get()
  config() {
    return this.service.configSummary()
  }
}
