import { AppTransaction } from '@kin-kinetic/api/app/data-access'
import {
  ApiTransactionDataAccessService,
  MakeTransferRequest,
  MinimumRentExemptionBalanceRequest,
  MinimumRentExemptionBalanceResponse,
  LatestBlockhashResponse,
} from '@kin-kinetic/api/transaction/data-access'
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('transaction')
@Controller('transaction')
export class ApiTransactionFeatureController {
  constructor(private readonly service: ApiTransactionDataAccessService) {}

  @Get('latest-blockhash/:environment/:index')
  @ApiOperation({ operationId: 'getLatestBlockhash' })
  @ApiResponse({ type: LatestBlockhashResponse })
  getLatestBlockhash(@Param('environment') environment: string, @Param('index', ParseIntPipe) index: number) {
    return this.service.getLatestBlockhash(environment, index)
  }

  @Get('minimum-rent-exemption-balance/:environment/:index')
  @ApiOperation({ operationId: 'getMinimumRentExemptionBalance' })
  @ApiResponse({ type: MinimumRentExemptionBalanceResponse })
  getMinimumRentExemptionBalance(
    @Param('environment') environment: string,
    @Param('index', ParseIntPipe) index: number,
    @Param('input') input: MinimumRentExemptionBalanceRequest,
  ) {
    return this.service.getMinimumRentExemptionBalance(environment, index, input)
  }

  @Post('make-transfer')
  @ApiBody({ type: MakeTransferRequest })
  @ApiOperation({ operationId: 'makeTransfer' })
  @ApiResponse({ type: AppTransaction })
  makeTransfer(@Body() body: MakeTransferRequest) {
    return this.service.makeTransfer(body)
  }
}
