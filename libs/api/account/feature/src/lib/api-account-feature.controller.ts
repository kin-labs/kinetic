import {
  ApiAccountDataAccessService,
  BalanceResponse,
  CreateAccountRequest,
  CreateAccountResponse,
  HistoryResponse,
} from '@mogami/api/account/data-access'
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator'
import { Commitment } from '@solana/web3.js'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Get('info/:accountId')
  getAccountInfo(@Param('accountId') accountId: string, @Query('commitment') commitment?: Commitment) {
    return this.service.getAccountInfo(accountId, commitment)
  }

  @Post('create')
  @ApiBody({ type: CreateAccountRequest })
  @ApiOperation({ operationId: 'createAccount' })
  @ApiResponse({ type: CreateAccountResponse })
  createAccount(@Body() body: CreateAccountRequest) {
    return this.service.createAccount(body)
  }

  @Get('balance/:accountId')
  @ApiOperation({ operationId: 'getBalance' })
  @ApiResponse({ type: BalanceResponse })
  getBalance(@Param('accountId') accountId: string) {
    return this.service.getBalance(accountId)
  }

  @Get('history/:accountId')
  @ApiOperation({ operationId: 'getHistory' })
  @ApiResponse({ type: HistoryResponse })
  getHistory(@Param('accountId') accountId: string) {
    return this.service.getHistory(accountId)
  }

  @Get('token-accounts/:accountId')
  @ApiOperation({ operationId: 'tokenAccounts' })
  @ApiResponse({ type: String, isArray: true })
  tokenAccounts(@Param('accountId') accountId: string) {
    return this.service.getTokenAccounts(accountId)
  }
}
