import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Module } from '@nestjs/common'
import { ApiWalletAdminService } from './api-wallet-admin.service'
import { ApiWalletUserService } from './api-wallet-user.service'

@Module({
  providers: [ApiWalletAdminService, ApiWalletUserService],
  exports: [ApiWalletAdminService, ApiWalletUserService],
  imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule, ApiWebhookDataAccessModule],
})
export class ApiWalletDataAccessModule {}
