import {
  AirdropRequest,
  AirdropResponse,
  AirdropStats,
  ApiAirdropDataAccessService,
} from '@mogami/api/airdrop/data-access'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('airdrop')
@Controller('airdrop')
export class ApiAirdropFeatureController {
  constructor(private readonly service: ApiAirdropDataAccessService) {}

  @Post()
  @ApiOperation({ operationId: 'airdropRequest' })
  @ApiResponse({ type: AirdropResponse })
  request(@Body() body: AirdropRequest) {
    return this.service.request(body)
  }

  @Get('stats')
  @ApiOperation({ operationId: 'airdropStats' })
  @ApiResponse({ type: AirdropStats })
  stats() {
    return this.service.stats()
  }
}
