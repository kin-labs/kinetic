import { ApiConfigDataAccessService, ApiConfigSummary } from '@kin-kinetic/api/config/data-access'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('config')
@Controller('config')
export class ApiConfigFeatureController {
  constructor(private readonly service: ApiConfigDataAccessService) {}

  @Get()
  @ApiOperation({ operationId: 'config' })
  @ApiResponse({ type: ApiConfigSummary })
  config() {
    return this.service.configSummary()
  }
}
