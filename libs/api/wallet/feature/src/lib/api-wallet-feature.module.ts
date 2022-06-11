import { ApiWalletDataAccessModule } from '@mogami/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiWalletUserFeatureResolver } from './api-wallet-user-feature.resolver'

@Module({
  imports: [ApiWalletDataAccessModule],
  providers: [ApiWalletUserFeatureResolver],
})
export class ApiWalletFeatureModule {}
