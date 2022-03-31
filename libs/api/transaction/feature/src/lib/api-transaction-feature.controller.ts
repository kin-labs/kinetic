import {
  ApiTransactionDataAccessService,
  RecentBlockhashResponse,
  ServiceConfigResponse,
  SubmitPaymentRequest,
  MinimumKinVersionResponse,
  MinimumBalanceForRentExemptionResponse,
  SubmitTransactionResponse,
} from '@mogami/api/transaction/data-access'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('transaction')
@Controller('transaction')
export class ApiTransactionFeatureController {
  constructor(private readonly service: ApiTransactionDataAccessService) {}

  @Get('service-config')
  @ApiResponse({ type: ServiceConfigResponse })
  getServiceConfig() {
    return this.service.getServiceConfig()
  }

  @Get('minimum-kin-version')
  @ApiResponse({ type: MinimumKinVersionResponse })
  getMinimumKinVersion() {
    return this.service.getMinimumKinVersion()
  }

  @Get('recent-blockhash')
  @ApiResponse({ type: RecentBlockhashResponse })
  getRecentBlockhash() {
    return this.service.getRecentBlockhash()
  }

  @Get('minimum-balance-for-rent-exemption/:dataLength')
  @ApiResponse({ type: MinimumBalanceForRentExemptionResponse })
  getMinimumBalanceForRentExemption(@Param('dataLength') dataLength: number) {
    return this.service.getMinimumBalanceForRentExemption(dataLength)
  }

  @Get('history')
  getHistory() {
    return this.service.getHistory()
  }

  @Post('sign-transaction')
  signTransaction() {
    return this.service.signTransaction()
  }

  @Post('submit-transaction')
  @ApiBody({ type: SubmitPaymentRequest })
  @ApiResponse({ type: SubmitTransactionResponse })
  submitTransaction(@Body() body: SubmitPaymentRequest) {
    return this.service.submitTransaction(body)
  }
}
