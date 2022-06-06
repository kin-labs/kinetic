import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiWalletDataAccessModule } from '@mogami/api/wallet/data-access'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { makeCounterProvider } from '@willsoto/nestjs-prometheus'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { ApiAppWebhookDataAccessService } from './api-app-webhook-data-access.service'

@Module({
  providers: [
    ApiAppDataAccessService,
    ApiAppWebhookDataAccessService,
    makeCounterProvider({
      name: 'app_config_metric_name',
      help: 'app_config_metric_help',
    }),
  ],
  exports: [ApiAppDataAccessService, ApiAppWebhookDataAccessService],
  imports: [ApiCoreDataAccessModule, ApiWalletDataAccessModule, HttpModule],
})
export class ApiAppDataAccessModule {}
