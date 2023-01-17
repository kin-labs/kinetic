import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiAppAdminDataAccessService } from './api-app-admin-data-access.service'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { ApiAppEnvAdminDataAccessService } from './api-app-env-admin-data-access.service'
import { ApiAppEnvUserDataAccessService } from './api-app-env-user-data-access.service'
import { ApiAppUserDataAccessService } from './api-app-user-data-access.service'

@Module({
  providers: [
    ApiAppAdminDataAccessService,
    ApiAppDataAccessService,
    ApiAppEnvAdminDataAccessService,
    ApiAppEnvUserDataAccessService,
    ApiAppUserDataAccessService,
  ],
  exports: [
    ApiAppAdminDataAccessService,
    ApiAppDataAccessService,
    ApiAppEnvAdminDataAccessService,
    ApiAppEnvUserDataAccessService,
    ApiAppUserDataAccessService,
  ],
  imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule, ApiWalletDataAccessModule],
})
export class ApiAppDataAccessModule {}
