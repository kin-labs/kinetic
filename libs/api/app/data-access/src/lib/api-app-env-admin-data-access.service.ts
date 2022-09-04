import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { ApiAppAdminDataAccessService } from './api-app-admin-data-access.service'

@Injectable()
export class ApiAppEnvAdminDataAccessService {
  private readonly logger = new Logger(ApiAppEnvAdminDataAccessService.name)

  constructor(
    private readonly appAdmin: ApiAppAdminDataAccessService,
    private readonly data: ApiCoreDataAccessService,
  ) {}

  async adminDeleteAppEnv(userId: string, appId: string, appEnvId: string) {
    this.logger.warn(`Admin ${userId} deleted AppEnv ${appEnvId} from App ${appId}`)
    await this.appAdmin.ensureAppById(userId, appId)
    await this.data.appWebhook.deleteMany({ where: { appEnv: { appId, id: appEnvId } } })
    await this.data.appTransactionError.deleteMany({ where: { appTransaction: { appEnv: { appId, id: appEnvId } } } })
    await this.data.appTransaction.deleteMany({ where: { appEnv: { appId, id: appEnvId } } })
    return this.data.appEnv.delete({ where: { id: appEnvId } })
  }
}
