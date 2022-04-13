import { ApiAppConfigGuard, ApiAppDataAccessService, AppConfig } from '@mogami/api/app/data-access'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

@ApiTags('app')
@Controller('app')
@UseGuards(ApiAppConfigGuard)
export class ApiAppFeatureController {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Get('config')
  @ApiOperation({ operationId: 'getAppConfig' })
  @ApiResponse({ type: AppConfig })
  app(@Req() req: Request) {
    return this.service.getConfig(req.hostname)
  }
}
