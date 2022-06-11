import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { UserRole } from '@mogami/api/user/data-access'
import { Injectable, NotFoundException } from '@nestjs/common'
import { AppUserRole, Prisma } from '@prisma/client'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { AppTransactionListInput } from './dto/app-transaction-list.input'

@Injectable()
export class ApiAppUserDataAccessService {
  constructor(private readonly app: ApiAppDataAccessService, private readonly data: ApiCoreDataAccessService) {}

  async userApps(userId: string) {
    const user = await this.data.getUserById(userId)
    return this.data.app.findMany({
      include: this.app.include,
      orderBy: { updatedAt: 'desc' },
      where: this.allowAdmin(user.role, userId),
    })
  }

  async userApp(userId: string, appId: string) {
    await this.ensureAppUser(userId, appId)
    return this.data.getAppById(appId)
  }

  async userAppEnv(userId: string, appId: string, appEnvId: string) {
    await this.ensureAppUser(userId, appId)
    return this.data.appEnv.findUnique({
      where: { id: appEnvId },
      include: {
        app: true,
        cluster: true,
        mints: {
          include: {
            mint: true,
            wallet: true,
          },
        },
        wallets: true,
      },
    })
  }

  userAppRole(userId: string, appId: string) {
    return this.ensureAppUser(userId, appId)
  }

  async userAppTransaction(userId: string, appId: string, appEnvId: string, appTransactionId: string) {
    await this.ensureAppUser(userId, appId)
    return this.data.appTransaction.findFirst({
      where: { id: appTransactionId, appEnvId },
      include: { errors: true },
    })
  }

  async userAppTransactions(userId: string, appId: string, appEnvId: string, input: AppTransactionListInput = {}) {
    await this.ensureAppUser(userId, appId)
    return this.data.appTransaction.findMany({
      where: { appEnvId, ...input },
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: { errors: true },
    })
  }

  async userAppWebhook(userId: string, appId: string, appWebhookId: string) {
    await this.ensureAppUser(userId, appId)
    return this.data.appWebhook.findUnique({
      where: { id: appWebhookId },
    })
  }

  async userAppWebhooks(userId: string, appId: string, appEnvId: string) {
    await this.ensureAppUser(userId, appId)
    return this.data.appWebhook.findMany({
      where: { appEnvId },
      take: 100,
      orderBy: { updatedAt: 'desc' },
    })
  }

  private allowAdmin = (role: UserRole, userId): Prisma.AppWhereInput => {
    return role !== UserRole.Admin ? { users: { some: { userId: userId } } } : {}
  }

  private async ensureAppUser(userId: string, appId: string): Promise<AppUserRole> {
    const user = await this.data.getUserById(userId)
    if (user.role === UserRole.Admin) {
      return AppUserRole.Owner
    }
    const appUser = await this.data.appUser.findFirst({ where: { appId, userId } })
    if (!appUser) {
      throw new NotFoundException(`User ${userId} does not have access to app with id ${appId}.`)
    }
    return appUser?.role
  }
}
