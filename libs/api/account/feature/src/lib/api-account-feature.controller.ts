import {
  ApiAccountDataAccessService,
  BalanceResponse,
  CreateAccountRequest,
} from '@kin-kinetic/api/account/data-access'
import { getAppKey, PublicKeyPipe } from '@kin-kinetic/api/core/util'
import { AccountInfo, CloseAccountRequest, HistoryResponse } from '@kin-kinetic/api/kinetic/data-access'
import { Transaction } from '@kin-kinetic/api/transaction/data-access'
import { Commitment } from '@kin-kinetic/solana'
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

@ApiTags('account')
@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Post('close')
  @ApiBody({ type: CloseAccountRequest })
  @ApiOperation({ operationId: 'closeAccount' })
  @ApiResponse({ type: Transaction })
  closeAccount(@Req() req: Request, @Body() body: CloseAccountRequest) {
    return this.service.closeAccount(req, body)
  }

  @Post('create')
  @ApiBody({ type: CreateAccountRequest })
  @ApiOperation({ operationId: 'createAccount' })
  @ApiResponse({ type: Transaction })
  createAccount(@Req() req: Request, @Body() body: CreateAccountRequest) {
    return this.service.createAccount(req, body)
  }

  @Get('info/:environment/:index/:accountId/:mint')
  @ApiOperation({ operationId: 'getAccountInfo' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiQuery({ name: 'commitment', enum: Commitment, enumName: 'Commitment' })
  @ApiResponse({ type: AccountInfo })
  getAccountInfo(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
    @Param('mint', new PublicKeyPipe('mint')) mint: string,
    @Query('commitment') commitment: Commitment,
  ) {
    return this.service.kinetic.getAccountInfo(getAppKey(environment, index), accountId, mint, commitment)
  }

  @Get('balance/:environment/:index/:accountId')
  @ApiOperation({ operationId: 'getBalance' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiQuery({ name: 'commitment', enum: Commitment, enumName: 'Commitment' })
  @ApiResponse({ type: BalanceResponse })
  getBalance(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
    @Query('commitment') commitment: Commitment,
  ) {
    return this.service.getBalance(getAppKey(environment, index), accountId, commitment)
  }

  @Get('history/:environment/:index/:accountId/:mint')
  @ApiOperation({ operationId: 'getHistory' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiQuery({ name: 'commitment', enum: Commitment, enumName: 'Commitment' })
  @ApiResponse({ type: HistoryResponse, isArray: true })
  getHistory(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
    @Param('mint', new PublicKeyPipe('mint')) mint: string,
    @Query('commitment') commitment: Commitment,
  ) {
    return this.service.kinetic.getHistory(getAppKey(environment, index), accountId, mint, commitment)
  }

  @Get('token-accounts/:environment/:index/:accountId/:mint')
  @ApiOperation({ operationId: 'getTokenAccounts' })
  @ApiParam({ name: 'index', type: 'integer' })
  @ApiQuery({ name: 'commitment', enum: Commitment, enumName: 'Commitment' })
  @ApiResponse({ type: String, isArray: true })
  getTokenAccounts(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('accountId', new PublicKeyPipe('accountId')) accountId: string,
    @Param('mint', new PublicKeyPipe('mint')) mint: string,
    @Query('commitment') commitment: Commitment,
  ) {
    return this.service.kinetic.getTokenAccounts(getAppKey(environment, index), accountId, mint, commitment)
  }
}
