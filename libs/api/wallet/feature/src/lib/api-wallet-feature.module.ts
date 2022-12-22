import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiWalletAdminFeatureResolver } from './api-wallet-admin-feature.resolver'
import { ApiWalletUserFeatureResolver } from './api-wallet-user-feature.resolver'

@Module({
  imports: [ApiWalletDataAccessModule],
  providers: [ApiWalletAdminFeatureResolver, ApiWalletUserFeatureResolver],
})
export class ApiWalletFeatureModule {}
