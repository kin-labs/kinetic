import { ApiAppDataAccessService, AppConfig } from '@mogami/api/app/data-access'
import { Controller, Get, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('app')
@Controller('app')
export class ApiAppFeatureController {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Get('config/:index')
  @ApiOperation({ operationId: 'getAppConfig' })
  @ApiResponse({ type: AppConfig })
  app(@Param('environment') environment: string, @Param('index', ParseIntPipe) index: number) {
    return this.service.getAppConfig(environment, index)
  }

  @Post(':index/webhook/:type')
  async appWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Param('index', ParseIntPipe) index: number,
    @Param('type') type: string,
  ) {
    return this.service.storeIncomingWebhook(index, type, req.headers, req.body, res)
  }
}
