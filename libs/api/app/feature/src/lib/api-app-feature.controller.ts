import { ApiAppDataAccessService, AppConfig, AppHealth } from '@kin-kinetic/api/app/data-access'
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('app')
@Controller('app')
export class ApiAppFeatureController {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Get(':environment/:index/config')
  @ApiOperation({ operationId: 'getAppConfig' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiResponse({ type: AppConfig })
  app(@Param('environment') environment: string, @Param('index', ParseIntPipe) index: number) {
    return this.service.getAppConfig(environment, index)
  }

  @Get(':environment/:index/health')
  @ApiOperation({ operationId: 'getAppHealth' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiResponse({ type: AppHealth })
  appHealth(@Param('environment') environment: string, @Param('index', ParseIntPipe) index: number) {
    return this.service.getAppHealth(environment, index)
  }
}
