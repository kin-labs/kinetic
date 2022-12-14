import { getAppKey } from '@kin-kinetic/api/core/util'
import { ApiWebhookDataAccessService } from '@kin-kinetic/api/webhook/data-access'
import { Controller, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { Request, Response } from 'express'

@Controller('app')
export class ApiWebhookFeatureController {
  constructor(private readonly service: ApiWebhookDataAccessService) {}

  @Post('/:environment/:index/webhook/:type')
  @ApiExcludeEndpoint()
  async storeIncomingWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('type') type: string,
  ) {
    return this.service.storeIncomingWebhook(getAppKey(environment, index), type, req.headers, req.body, res)
  }
}
