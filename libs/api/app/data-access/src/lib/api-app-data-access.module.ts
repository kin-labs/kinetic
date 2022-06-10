import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiWalletDataAccessModule } from '@mogami/api/wallet/data-access'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { ApiAppUserDataAccessService } from './api-app-user-data-access.service'
import { ApiAppWebhookDataAccessService } from './api-app-webhook-data-access.service'

@Module({
  providers: [ApiAppDataAccessService, ApiAppWebhookDataAccessService, ApiAppUserDataAccessService],
  exports: [ApiAppDataAccessService, ApiAppWebhookDataAccessService, ApiAppUserDataAccessService],
  imports: [ApiCoreDataAccessModule, ApiWalletDataAccessModule, HttpModule],
})
export class ApiAppDataAccessModule {}
