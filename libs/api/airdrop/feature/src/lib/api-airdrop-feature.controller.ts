import { AirdropRequest, ApiAirdropDataAccessService } from '@mogami/api/airdrop/data-access'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('airdrop')
@Controller('airdrop')
export class ApiAirdropFeatureController {
  constructor(private readonly service: ApiAirdropDataAccessService) {}

  @Post()
  request(@Body() body: AirdropRequest) {
    return this.service.request(body)
  }
}
