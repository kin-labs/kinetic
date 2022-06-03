import { ApiAppDataAccessService, AppConfig, AppHealth } from '@mogami/api/app/data-access'
import { Controller, Get, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('app')
@Controller('app')
export class ApiAppFeatureController {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Get(':environment/:index/config')
  @ApiOperation({ operationId: 'getAppConfig' })
  @ApiResponse({ type: AppConfig })
  app(@Param('environment') environment: string, @Param('index', ParseIntPipe) index: number) {
    return this.service.getAppConfig(environment, index)
  }

  @Get(':environment/:index/health')
  @ApiOperation({ operationId: 'getAppHealth' })
  @ApiResponse({ type: AppHealth })
  appHealth(@Param('environment') environment: string, @Param('index', ParseIntPipe) index: number) {
    return this.service.getAppHealth(environment, index)
  }

  @Post('/:environment/:index/webhook/:type')
  async appWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('type') type: string,
  ) {
    return this.service.storeIncomingWebhook(environment, index, type, req.headers, req.body, res)
  }
}
