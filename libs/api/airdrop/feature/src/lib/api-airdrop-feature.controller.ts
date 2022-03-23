import {
  AirdropRequest,
  AirdropResponse,
  AirdropStats,
  ApiAirdropDataAccessService,
} from '@mogami/api/airdrop/data-access'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('airdrop')
@Controller('airdrop')
export class ApiAirdropFeatureController {
  constructor(private readonly service: ApiAirdropDataAccessService) {}

  @Post()
  @ApiResponse({ type: AirdropResponse })
  request(@Body() body: AirdropRequest) {
    return this.service.request(body)
  }

  @Get('stats')
  @ApiResponse({ type: AirdropStats })
  stats() {
    return this.service.stats()
  }
}
