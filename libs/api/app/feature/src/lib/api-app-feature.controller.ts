import { ApiAppDataAccessService, AppConfig } from '@mogami/api/app/data-access'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('app')
@Controller('app')
export class ApiAppFeatureController {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Get('config/:index')
  @ApiOperation({ operationId: 'getAppConfig' })
  @ApiResponse({ type: AppConfig })
  app(@Param('index') index: string) {
    return this.service.getConfig(Number(index))
  }
}
