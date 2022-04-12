import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { ApiWalletDataAccessService } from '@mogami/api/wallet/data-access'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { App, AppDomain, AppEnv, Prisma } from '@prisma/client'
import { AppCreateInput } from './dto/app-create.input'
import { AppUpdateInput } from './dto/app-update.input'
import { AppUserAddInput } from './dto/app-user-add.input'
import { AppUserRemoveInput } from './dto/app-user-remove.input'
import { AppUserUpdateRoleInput } from './dto/app-user-update-role.input'
import { AppConfig } from './entity/app-config.entity'
import { AppUserRole } from './entity/app-user-role.enum'

@Injectable()
export class ApiAppDataAccessService {
  private readonly configs = new Map<string, AppConfig>()
  private include: Prisma.AppInclude = {
    envs: { include: { domains: true } },
    users: { include: { user: true } },
    wallet: true,
  }
  constructor(private readonly data: ApiCoreDataAccessService, private readonly wallet: ApiWalletDataAccessService) {}

  getConfig(hostname): AppConfig {
    return this.configs.get(hostname)
  }

  setConfig(hostname, config: AppConfig) {
    this.configs.set(hostname, config)
  }

  async createApp(userId: string, input: AppCreateInput) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.getAppByIndex(input.index)
    if (app) {
      throw new BadRequestException(`App with index ${input.index} already exists`)
    }
    let wallet
    if (!input.skipWalletCreation) {
      const generated = await this.wallet.generateWallet(userId)
      wallet = { connect: { id: generated.id } }
    }
    const hostname = `${input.index}.${this.data.config.mogamiDomain}`
    const data: Prisma.AppCreateInput = {
      index: input.index,
      name: input.name,
      envs: {
        create: [
          {
            name: 'default',
            domains: { create: [{ hostname }] },
          },
        ],
      },
      users: { create: { role: AppUserRole.Owner, userId } },
      wallet,
    }
    return this.data.app.create({ data, include: this.include })
  }

  async deleteApp(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    await this.data.appUser.deleteMany({ where: { appId } })
    return this.data.app.delete({ where: { id: appId } })
  }

  async apps(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.app.findMany({ include: { wallet: true }, orderBy: { updatedAt: 'desc' } })
  }

  async app(userId: string, appId: string) {
    return this.ensureAppById(userId, appId)
  }

  async appUserAdd(userId: string, appId: string, input: AppUserAddInput) {
    await this.ensureAppById(userId, appId)
    return this.data.app.update({
      where: { id: appId },
      data: { users: { create: { userId: input.userId, role: input.role } } },
      include: this.include,
    })
  }

  async appUserRemove(userId: string, appId: string, input: AppUserRemoveInput) {
    await this.ensureAppById(userId, appId)
    return this.data.app.update({
      where: { id: appId },
      data: { users: { deleteMany: { userId: input.userId } } },
      include: this.include,
    })
  }

  async appUserUpdateRole(userId: string, appId: string, input: AppUserUpdateRoleInput) {
    await this.ensureAppById(userId, appId)
    const existing = await this.data.appUser.findFirst({ where: { userId: input.userId, appId: appId } })
    return this.data.app.update({
      where: { id: appId },
      data: {
        users: {
          update: {
            where: { id: existing.id },
            data: { role: input.role },
          },
        },
      },
      include: this.include,
    })
  }

  async updateApp(userId: string, appId: string, data: AppUpdateInput) {
    await this.ensureAppById(userId, appId)
    return this.data.app.update({ where: { id: appId }, data, include: this.include })
  }

  private async ensureAppById(userId: string, appId: string) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.app.findUnique({
      where: { id: appId },
      include: this.include,
    })
    if (!app) {
      throw new NotFoundException(`App with id ${appId} does not exist.`)
    }
    return app
  }

  async appWalletAdd(userId: string, appId: string, walletId: string) {
    const app = await this.ensureAppById(userId, appId)
    if (app.walletId) {
      throw new BadRequestException(`App already has a wallet`)
    }
    const wallet = await this.data.wallet.findUnique({ where: { id: walletId } })
    if (!wallet) {
      throw new BadRequestException(`Wallet with id ${walletId} not found`)
    }
    return this.data.app.update({
      where: { id: appId },
      data: { walletId: wallet.id },
      include: this.include,
    })
  }

  async appWalletRemove(userId: string, appId: string, walletId: string) {
    const app = await this.ensureAppById(userId, appId)
    if (!app.walletId) {
      throw new BadRequestException(`App already has no wallet`)
    }
    const wallet = await this.data.wallet.findUnique({ where: { id: walletId } })
    if (!wallet) {
      throw new BadRequestException(`Wallet with id ${walletId} not found`)
    }
    return this.data.app.update({
      where: { id: appId },
      data: { wallet: { disconnect: true } },
      include: this.include,
    })
  }

  findAppByDomain(hostname: string): Promise<AppDomain & { env: AppEnv & { app: App } }> {
    return this.data.appDomain.findUnique({
      where: { hostname },
      include: {
        env: {
          include: { app: true },
        },
      },
    })
  }
}
