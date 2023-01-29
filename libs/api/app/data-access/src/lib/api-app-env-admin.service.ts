import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { ApiAppAdminService } from './api-app-admin.service'

@Injectable()
export class ApiAppEnvAdminService {
  private readonly logger = new Logger(ApiAppEnvAdminService.name)

  constructor(private readonly appAdmin: ApiAppAdminService, private readonly core: ApiCoreService) {}

  async adminDeleteAppEnv(userId: string, appId: string, appEnvId: string) {
    this.logger.warn(`Admin ${userId} deleted AppEnv ${appEnvId} from App ${appId}`)
    await this.appAdmin.ensureAppById(userId, appId)
    return this.core.deleteAppEnv(appId, appEnvId)
  }
}
