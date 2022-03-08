import { ApiAccountDataAccessService } from '@mogami/api/account/data-access'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Commitment } from '@solana/web3.js'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Get('info/:accountId')
  getAccountInfo(@Param('accountId') accountId: string, @Query('commitment') commitment: Commitment) {
    return this.service.getAccountInfo(accountId, commitment)
  }

  // @Post('account')
  // createAccount() {
  //   return this.service.createAccount(null)
  // }

  @Get('token-accounts/:accountId')
  tokenAccounts(@Param('accountId') accountId: string, @Query('commitment') commitment: Commitment) {
    return this.service.tokenAccounts(accountId, commitment)
  }
}
