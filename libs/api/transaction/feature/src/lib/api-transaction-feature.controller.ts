import {
  ApiTransactionDataAccessService,
  MakeTransferRequest,
  MakeTransferResponse,
  MinimumRentExemptionBalanceRequest,
  MinimumRentExemptionBalanceResponse,
  RecentBlockhashResponse,
  ServiceConfigResponse,
} from '@mogami/api/transaction/data-access'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('transaction')
@Controller('transaction')
export class ApiTransactionFeatureController {
  constructor(private readonly service: ApiTransactionDataAccessService) {}

  @Get('service-config')
  @ApiOperation({ operationId: 'getServiceConfig' })
  @ApiResponse({ type: ServiceConfigResponse })
  getServiceConfig() {
    return this.service.getServiceConfig()
  }

  @Get('recent-blockhash')
  @ApiOperation({ operationId: 'getRecentBlockhash' })
  @ApiResponse({ type: RecentBlockhashResponse })
  getRecentBlockhash() {
    return this.service.getRecentBlockhash()
  }

  @Get('minimum-rent-exemption-balance')
  // @ApiParam({
  //   name: 'input',
  //   type: MinimumRentExemptionBalanceRequest,
  // })
  // @ApiBody({ type: MakeTransferRequest })
  @ApiOperation({ operationId: 'getMinimumRentExemptionBalance' })
  @ApiResponse({ type: MinimumRentExemptionBalanceResponse })
  getMinimumRentExemptionBalance(@Param('input') input: MinimumRentExemptionBalanceRequest) {
    return this.service.getMinimumRentExemptionBalance(input)
  }

  @Post('make-transfer')
  @ApiBody({ type: MakeTransferRequest })
  @ApiOperation({ operationId: 'makeTransfer' })
  @ApiResponse({ type: MakeTransferResponse })
  makeTransfer(@Body() body: MakeTransferRequest) {
    return this.service.makeTransfer(body)
  }
}
