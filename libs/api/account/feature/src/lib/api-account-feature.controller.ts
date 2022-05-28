import {
  ApiAccountDataAccessService,
  BalanceResponse,
  CreateAccountRequest,
  HistoryResponse,
} from '@mogami/api/account/data-access'
import { AppTransaction } from '@mogami/api/app/data-access'
import { AccountIdSchema, JoiValidationPipe } from '@mogami/api/core/util'
import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Commitment } from '@solana/web3.js'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Get('info/:accountId')
  @UsePipes(new JoiValidationPipe(AccountIdSchema))
  getAccountInfo(@Param('accountId') accountId: string, @Query('commitment') commitment?: Commitment) {
    return this.service.getAccountInfo(accountId, commitment)
  }

  @Post('create')
  @ApiBody({ type: CreateAccountRequest })
  @ApiOperation({ operationId: 'createAccount' })
  @ApiResponse({ type: AppTransaction })
  createAccount(@Body() body: CreateAccountRequest) {
    return this.service.createAccount(body)
  }

  @Get('balance/:accountId')
  @UsePipes(new JoiValidationPipe(AccountIdSchema))
  @ApiOperation({ operationId: 'getBalance' })
  @ApiResponse({ type: BalanceResponse })
  getBalance(@Param('accountId') accountId: string) {
    return this.service.getBalance(accountId)
  }

  @Get('history/:accountId')
  @UsePipes(new JoiValidationPipe(AccountIdSchema))
  @ApiOperation({ operationId: 'getHistory' })
  @ApiResponse({ type: HistoryResponse, isArray: true })
  getHistory(@Param('accountId') accountId: string) {
    return this.service.getHistory(accountId)
  }

  @Get('token-accounts/:accountId')
  @UsePipes(new JoiValidationPipe(AccountIdSchema))
  @ApiOperation({ operationId: 'tokenAccounts' })
  @ApiResponse({ type: String, isArray: true })
  tokenAccounts(@Param('accountId') accountId: string) {
    return this.service.getTokenAccounts(accountId)
  }
}
