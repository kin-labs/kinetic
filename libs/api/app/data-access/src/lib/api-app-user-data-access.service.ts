import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { UserRole } from '@mogami/api/user/data-access'
import { Injectable, NotFoundException } from '@nestjs/common'
import { AppUser, AppUserRole, Prisma } from '@prisma/client'

@Injectable()
export class ApiAppUserDataAccessService {
  private includeAppEnv: Prisma.AppEnvInclude = {
    cluster: true,
    mints: {
      include: {
        mint: true,
        wallet: true,
      },
    },
    wallets: true,
  }
  private include: Prisma.AppInclude = {
    users: { include: { user: true } },
    envs: {
      include: this.includeAppEnv,
    },
  }

  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userApps(userId: string) {
    const user = await this.data.getUserById(userId)
    return this.data.app.findMany({
      include: this.include,
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
