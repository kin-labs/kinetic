import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { ApiAppAdminDataAccessService } from './api-app-admin-data-access.service'

@Injectable()
export class ApiAppEnvAdminDataAccessService {
  private readonly logger = new Logger(ApiAppEnvAdminDataAccessService.name)

  constructor(private readonly appAdmin: ApiAppAdminDataAccessService, private readonly core: ApiCoreService) {}

  async adminDeleteAppEnv(userId: string, appId: string, appEnvId: string) {
    this.logger.warn(`Admin ${userId} deleted AppEnv ${appEnvId} from App ${appId}`)
    await this.appAdmin.ensureAppById(userId, appId)
    return this.core.deleteAppEnv(appId, appEnvId)
  }
}
