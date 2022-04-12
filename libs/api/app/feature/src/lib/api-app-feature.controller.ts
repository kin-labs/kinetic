import { ApiAppConfigGuard, ApiAppDataAccessService } from '@mogami/api/app/data-access'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

@Controller('app')
@UseGuards(ApiAppConfigGuard)
export class ApiAppFeatureController {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Get('config')
  app(@Req() req: Request) {
    return this.service.getConfig(req.hostname)
  }
}
