import { ApiConfigDataAccessService, ApiConfigSummary } from '@mogami/api/config/data-access'
import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('config')
@Controller('config')
export class ApiConfigFeatureController {
  constructor(private readonly service: ApiConfigDataAccessService) {}

  @Get()
  @ApiResponse({ type: ApiConfigSummary })
  config() {
    return this.service.configSummary()
  }
}
