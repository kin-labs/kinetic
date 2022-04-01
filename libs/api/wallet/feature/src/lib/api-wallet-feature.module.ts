import { ApiWalletDataAccessModule } from '@mogami/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiWalletFeatureResolver } from './api-wallet-feature.resolver'

@Module({
  imports: [ApiWalletDataAccessModule],
  providers: [ApiWalletFeatureResolver],
})
export class ApiWalletFeatureModule {}
