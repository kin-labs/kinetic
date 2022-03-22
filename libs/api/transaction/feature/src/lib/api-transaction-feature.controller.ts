import {
  ApiTransactionDataAccessService,
  RecentBlockhashResponse,
  ServiceConfigResponse,
} from '@mogami/api/transaction/data-access'
import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

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
  getMinimumKinVersion() {
    return this.service.getMinimumKinVersion()
  }

  @Get('recent-blockhash')
  @ApiResponse({ type: RecentBlockhashResponse })
  getRecentBlockhash() {
    return this.service.getRecentBlockhash()
  }

  @Get('minimum-balance-for-rent-exemption/:dataLength')
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
  submitTransaction() {
    return this.service.submitTransaction()
  }
}
