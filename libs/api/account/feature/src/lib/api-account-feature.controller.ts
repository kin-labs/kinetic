import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiAccountDataAccessService } from '@mogami/api/account/data-access'
import { ApiTags } from '@nestjs/swagger'
import { Commitment, TokenAccountsFilter } from '@solana/web3.js'

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

  @Get('resolve-token-accounts')
  resolveTokenAccounts(
    @Param('accountId') accountId: string,
    @Param('filter') filter: TokenAccountsFilter,
    @Query('commitment') commitment: Commitment,
  ) {
    return this.service.resolveTokenAccounts(accountId, filter, commitment)
  }
}
