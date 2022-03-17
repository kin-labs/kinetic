import { ApiAccountDataAccessService } from '@mogami/api/account/data-access'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Commitment } from '@solana/web3.js'
import { PublicKeyString } from '@mogami/solana'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Get('info/:accountId')
  getAccountInfo(@Param('accountId') accountId: PublicKeyString, @Query('commitment') commitment: Commitment) {
    return this.service.getAccountInfo(accountId, commitment)
  }

  // @Post('account')
  // createAccount() {
  //   return this.service.createAccount(null)
  // }

  @Get('balance/:accountId')
  getBalance(@Param('accountId') accountId: PublicKeyString) {
    return this.service.getBalance(accountId)
  }
  @Get('token-accounts/:accountId')
  tokenAccounts(@Param('accountId') accountId: PublicKeyString, @Query('commitment') commitment: Commitment) {
    return this.service.tokenAccounts(accountId, commitment)
  }
}
