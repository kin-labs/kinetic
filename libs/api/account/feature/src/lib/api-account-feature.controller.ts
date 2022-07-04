import {
  ApiAccountDataAccessService,
  BalanceResponse,
  CloseAccountRequest,
  CreateAccountRequest,
  HistoryResponse,
} from '@kin-kinetic/api/account/data-access'
import { AppTransaction } from '@kin-kinetic/api/app/data-access'
import { PublicKeyPipe } from '@kin-kinetic/api/core/util'
import { Commitment } from '@kin-kinetic/solana'
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Get('info/:environment/:index/:accountId')
  @ApiOperation({ operationId: 'getAccountInfo' })
  @ApiParam({ name: 'index', type: 'integer' })
  getAccountInfo(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
    @Query('commitment') commitment?: Commitment,
  ) {
    return this.service.getAccountInfo(environment, index, accountId, commitment)
  }

  @Post('close')
  @ApiBody({ type: CloseAccountRequest })
  @ApiOperation({ operationId: 'closeAccount' })
  @ApiResponse({ type: AppTransaction })
  closeAccount(@Body() body: CloseAccountRequest) {
    return this.service.createAccount(body)
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
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiResponse({ type: BalanceResponse })
  getBalance(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
  ) {
    return this.service.getBalance(environment, index, accountId)
  }

  @Get('history/:environment/:index/:accountId/:mint')
  @ApiOperation({ operationId: 'getHistory' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiResponse({ type: HistoryResponse, isArray: true })
  getHistory(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
    @Param('mint', new PublicKeyPipe('mint')) mint: string,
  ) {
    return this.service.getHistory(environment, index, accountId, mint)
  }

  @Get('token-accounts/:environment/:index/:accountId/:mint')
  @ApiOperation({ operationId: 'getTokenAccounts' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiResponse({ type: String, isArray: true })
  getTokenAccounts(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
    @Param('mint', new PublicKeyPipe('mint')) mint: string,
  ) {
    return this.service.getTokenAccounts(environment, index, accountId, mint)
  }
}
