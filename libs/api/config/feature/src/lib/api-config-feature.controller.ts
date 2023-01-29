import { ApiConfigService, ApiConfigSummary } from '@kin-kinetic/api/config/data-access'
import { Controller, Get } from '@nestjs/common'
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('config')
@Controller('config')
export class ApiConfigFeatureController {
  constructor(private readonly service: ApiConfigService) {}

  @Get()
  @ApiExcludeEndpoint()
  @ApiOperation({ operationId: 'config' })
  @ApiResponse({ type: ApiConfigSummary })
  config() {
    return this.service.configSummary()
  }
}
