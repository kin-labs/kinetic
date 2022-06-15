import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiWalletAdminFeatureResolver } from './api-wallet-admin-feature.resolver'
import { ApiWalletBalanceFeatureResolver } from './api-wallet-balance-feature.resolver'
import { ApiWalletUserFeatureResolver } from './api-wallet-user-feature.resolver'

@Module({
  imports: [ApiWalletDataAccessModule],
  providers: [ApiWalletAdminFeatureResolver, ApiWalletBalanceFeatureResolver, ApiWalletUserFeatureResolver],
})
export class ApiWalletFeatureModule {}
