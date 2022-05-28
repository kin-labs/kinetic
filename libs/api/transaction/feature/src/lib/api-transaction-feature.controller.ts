import { AppTransaction } from '@mogami/api/app/data-access'
import {
  ApiTransactionDataAccessService,
  MakeTransferRequest,
  MinimumRentExemptionBalanceRequest,
  MinimumRentExemptionBalanceResponse,
  LatestBlockhashResponse,
} from '@mogami/api/transaction/data-access'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('transaction')
@Controller('transaction')
export class ApiTransactionFeatureController {
  constructor(private readonly service: ApiTransactionDataAccessService) {}

  @Get('latest-blockhash')
  @ApiOperation({ operationId: 'getLatestBlockhash' })
  @ApiResponse({ type: LatestBlockhashResponse })
  getLatestBlockhash() {
    return this.service.getLatestBlockhash()
  }

  @Get('minimum-rent-exemption-balance')
  @ApiOperation({ operationId: 'getMinimumRentExemptionBalance' })
  @ApiResponse({ type: MinimumRentExemptionBalanceResponse })
  getMinimumRentExemptionBalance(@Param('input') input: MinimumRentExemptionBalanceRequest) {
    return this.service.getMinimumRentExemptionBalance(input)
  }

  @Post('make-transfer')
  @ApiBody({ type: MakeTransferRequest })
  @ApiOperation({ operationId: 'makeTransfer' })
  @ApiResponse({ type: AppTransaction })
  makeTransfer(@Body() body: MakeTransferRequest) {
    return this.service.makeTransfer(body)
  }
}
