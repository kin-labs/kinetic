import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { TransactionStatus } from '@prisma/client'
import { AppEnvStats } from './entity/app-env-stats.entity'
import { AppEnvTransactionCount } from './entity/app-env-transaction-count.entity'

@Injectable()
export class ApiAppEnvUserService {
  private readonly logger = new Logger(ApiAppEnvUserService.name)

  constructor(private readonly core: ApiCoreService) {}

  async userAppEnvStats(appEnvId: string): Promise<AppEnvStats> {
    const transactionCount = await this.userAppEnvTransactionCount(appEnvId)

    return { transactionCount }
  }

  private async userAppEnvTransactionCount(appEnvId: string): Promise<AppEnvTransactionCount> {
    const data = await this.core.transaction.groupBy({
      by: ['status'],
      where: { appEnvId },
      _count: {
        _all: true,
      },
    })
    return Object.keys(TransactionStatus).reduce((acc, curr) => {
      const found = data.find((item) => item.status === curr)

      return { ...acc, [curr]: found ? found._count._all : 0 }
    }, {})
  }

  async userAppEnvAddAllowedIp(appEnvId: string, ip: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const ips = appEnv?.ipsAllowed ? [...appEnv.ipsAllowed, ip] : [ip]
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { ipsAllowed: ips } })
  }

  async userAppEnvAddAllowedUa(appEnvId: string, ua: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const uas = appEnv?.uasAllowed ? [...appEnv.uasAllowed, ua] : [ua]
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { uasAllowed: uas } })
  }

  async userAppEnvAddBlockedIp(appEnvId: string, ip: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const ips = appEnv?.ipsBlocked ? [...appEnv.ipsBlocked, ip] : [ip]
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { ipsBlocked: ips } })
  }

  async userAppEnvAddBlockedUa(appEnvId: string, ua: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const uas = appEnv?.uasBlocked ? [...appEnv.uasBlocked, ua] : [ua]
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { uasBlocked: uas } })
  }

  async userAppEnvRemoveAllowedIp(appEnvId: string, ip: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const ips = appEnv.ipsAllowed.filter((ipAddress) => ipAddress !== ip)
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { ipsAllowed: ips } })
  }

  async userAppEnvRemoveAllowedUa(appEnvId: string, ua: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const uas = appEnv.uasAllowed.filter((userAgent) => userAgent !== ua)
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { uasAllowed: uas } })
  }

  async userAppEnvRemoveBlockedIp(appEnvId: string, ip: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const ips = appEnv.ipsBlocked.filter((ipAddress) => ipAddress !== ip)
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { ipsBlocked: ips } })
  }

  async userAppEnvRemoveBlockedUa(appEnvId: string, ua: string) {
    const appEnv = await this.core.getAppEnvById(appEnvId)
    const uas = appEnv.uasBlocked.filter((userAgent) => userAgent !== ua)
    return this.core.appEnv.update({ where: { id: appEnvId }, data: { uasBlocked: uas } })
  }

  async userAppEnvPurgeTransactions(appEnvId: string, status: TransactionStatus) {
    const deletedTransactionErrors = await this.core.transactionError.deleteMany({
      where: { transaction: { appEnvId: appEnvId, status: status ? status : undefined } },
    })
    const deletedWebhooks = await this.core.webhook.deleteMany({
      where: { transaction: { appEnvId: appEnvId, status: status ? status : undefined } },
    })
    const deletedTransactions = await this.core.transaction.deleteMany({
      where: { appEnvId: appEnvId, status: status ? status : undefined },
    })

    this.logger.verbose(`Deleted ${deletedTransactionErrors.count} transaction errors for appEnv ${appEnvId}`)
    this.logger.verbose(`Deleted ${deletedWebhooks.count} webhooks for appEnv ${appEnvId}`)
    this.logger.verbose(`Deleted ${deletedTransactions.count} transactions for appEnv ${appEnvId}`)

    return this.core.getAppEnvById(appEnvId)
  }

  async userDeleteAppEnv(userId: string, appId: string, appEnvId: string) {
    this.logger.warn(`User ${userId} deleted AppEnv ${appEnvId} from App ${appId}`)
    await this.core.ensureAppOwner(userId, appId)
    return this.core.deleteAppEnv(appId, appEnvId)
  }

  getEndpoint() {
    return this.core.config.apiUrl?.replace('/api', '')
  }
}
