import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Module } from '@nestjs/common'
import { ApiWalletAdminDataAccessService } from './api-wallet-admin-data-access.service'
import { ApiWalletUserDataAccessService } from './api-wallet-user-data-access.service'

@Module({
  providers: [ApiWalletAdminDataAccessService, ApiWalletUserDataAccessService],
  exports: [ApiWalletAdminDataAccessService, ApiWalletUserDataAccessService],
  imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule, ApiWebhookDataAccessModule],
})
export class ApiWalletDataAccessModule {}
