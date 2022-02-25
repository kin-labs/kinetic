import { Controller, Get, Post } from '@nestjs/common'
import { ApiAccountDataAccessService } from '@mogami/api/account/data-access'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Get('account-info')
  getAccountInfo() {
    return this.service.getAccountInfo()
  }

  @Post('account')
  createAccount() {
    return this.service.createAccount()
  }

  @Get('resolve-token-accounts')
  resolveTokenAccounts() {
    return this.service.resolveTokenAccounts()
  }
}
