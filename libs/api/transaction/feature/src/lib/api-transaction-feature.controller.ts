import { Controller, Get, Post, Param } from '@nestjs/common'
import { ApiTransactionDataAccessService } from '@mogami/api/transaction/data-access'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('transaction')
@Controller('transaction')
export class ApiTransactionFeatureController {
  constructor(private readonly service: ApiTransactionDataAccessService) {}

  @Get('service-config')
  getServiceConfig() {
    return this.service.getServiceConfig()
  }

  @Get('minimum-kin-version')
  getMinimumKinVersion() {
    return this.service.getMinimumKinVersion()
  }

  @Get('recent-blockhash')
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
