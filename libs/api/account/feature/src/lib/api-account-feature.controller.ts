import {
  ApiAccountDataAccessService,
  BalanceResponse,
  CreateAccountRequest,
  HistoryResponse,
} from '@kin-kinetic/api/account/data-access'
import { AppTransaction } from '@kin-kinetic/api/app/data-access'
import { AccountIdSchema, JoiValidationPipe } from '@kin-kinetic/api/core/util'
import { Commitment } from '@kin-kinetic/solana'
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Get('info/:environment/:index/:accountId')
  getAccountInfo(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new JoiValidationPipe(AccountIdSchema)) accountId: string,
    @Query('commitment') commitment?: Commitment,
  ) {
    return this.service.getAccountInfo(environment, index, accountId, commitment)
  }

  @Post('create')
  @ApiBody({ type: CreateAccountRequest })
  @ApiOperation({ operationId: 'createAccount' })
  @ApiResponse({ type: AppTransaction })
  createAccount(@Body() body: CreateAccountRequest) {
    return this.service.createAccount(body)
  }

  @Get('balance/:environment/:index/:accountId')
  @ApiOperation({ operationId: 'getBalance' })
  @ApiResponse({ type: BalanceResponse })
  getBalance(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new JoiValidationPipe(AccountIdSchema)) accountId: string,
  ) {
    return this.service.getBalance(environment, index, accountId)
  }

  @Get('history/:environment/:index/:accountId')
  @ApiOperation({ operationId: 'getHistory' })
  @ApiResponse({ type: HistoryResponse, isArray: true })
  getHistory(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new JoiValidationPipe(AccountIdSchema)) accountId: string,
  ) {
    return this.service.getHistory(environment, index, accountId)
  }

  @Get('token-accounts/:environment/:index/:accountId')
  @ApiOperation({ operationId: 'tokenAccounts' })
  @ApiResponse({ type: String, isArray: true })
  tokenAccounts(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new JoiValidationPipe(AccountIdSchema)) accountId: string,
  ) {
    return this.service.getTokenAccounts(environment, index, accountId)
  }
}
