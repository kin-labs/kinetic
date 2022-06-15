import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ApiAppAdminDataAccessService } from './api-app-admin-data-access.service'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { ApiAppUserDataAccessService } from './api-app-user-data-access.service'
import { ApiAppWebhookDataAccessService } from './api-app-webhook-data-access.service'

@Module({
  providers: [
    ApiAppAdminDataAccessService,
    ApiAppDataAccessService,
    ApiAppWebhookDataAccessService,
    ApiAppUserDataAccessService,
  ],
  exports: [
    ApiAppAdminDataAccessService,
    ApiAppDataAccessService,
    ApiAppWebhookDataAccessService,
    ApiAppUserDataAccessService,
  ],
  imports: [ApiCoreDataAccessModule, ApiWalletDataAccessModule, HttpModule],
})
export class ApiAppDataAccessModule {}
