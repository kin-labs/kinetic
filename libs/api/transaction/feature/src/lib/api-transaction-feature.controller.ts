import { Controller, Get, Post } from '@nestjs/common'
import { ApiTransactionDataAccessService } from '@mogami/api/transaction/data-access'

@Controller('transaction')
export class ApiTransactionFeatureController {
  constructor(private readonly service: ApiTransactionDataAccessService) {}

  @Get('service-config')
  getServiceConfig() {
    return this.service.getServiceConfig()
  }

  @Get('mininmum-kin-version')
  getMinimumKinVersion() {
    return this.service.getMinimumKinVersion()
  }

  @Get('recent-blockhash')
  getRecentBlockhash() {
    return this.service.getRecentBlockhash()
  }

  @Get('minimum-balance-for-rent-exemption')
  getMinimumBalanceForRentExemption() {
    return this.service.getMinimumBalanceForRentExemption(1)
  }

  @Get('history')
  getHistory() {
    return this.getHistory()
  }

  @Post('sign-transaction')
  signTransaction() {
    return this.signTransaction()
  }

  @Post('submit-transaction')
  submitTransaction() {
    return this.service.submitTransaction()
  }
}
