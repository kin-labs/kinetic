import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { UserRole } from '@kin-kinetic/api/user/data-access'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { AppEnvUpdateInput } from './dto/app-env-update.input'
import { AppMintUpdateInput } from './dto/app-mint-update.input'
import { AppTransactionListInput } from './dto/app-transaction-list.input'
import { AppUpdateInput } from './dto/app-update.input'
import { AppUserAddInput } from './dto/app-user-add.input'
import { AppUserRemoveInput } from './dto/app-user-remove.input'
import { AppUserUpdateRoleInput } from './dto/app-user-update-role.input'

@Injectable()
export class ApiAppUserDataAccessService {
  constructor(private readonly app: ApiAppDataAccessService, private readonly data: ApiCoreDataAccessService) {}

  async userApps(userId: string) {
    const user = await this.data.getUserById(userId)
    return this.data.app.findMany({
      include: this.app.include,
      orderBy: { name: 'asc' },
      where: this.allowAdmin(user.role, userId),
    })
  }

  async userApp(userId: string, appId: string) {
    await this.data.ensureAppUser(userId, appId)
    return this.data.getAppById(appId)
  }

  async userAppEnv(userId: string, appId: string, appEnvId: string) {
    await this.data.ensureAppUser(userId, appId)
    return this.data.appEnv.findUnique({
      where: { id: appEnvId },
      include: {
        app: true,
        cluster: {
          include: {
            mints: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
        mints: {
          include: {
            mint: true,
            wallet: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        wallets: true,
      },
    })
  }

  userAppRole(userId: string, appId: string) {
    return this.data.ensureAppUser(userId, appId)
  }

  async userAppTransaction(userId: string, appId: string, appEnvId: string, appTransactionId: string) {
    await this.data.ensureAppUser(userId, appId)
    return this.data.appTransaction.findFirst({
      where: { id: appTransactionId, appEnvId },
      include: { errors: true, appEnv: { include: { cluster: true } }, webhooks: true },
    })
  }

  async userAppTransactions(userId: string, appId: string, appEnvId: string, input: AppTransactionListInput = {}) {
    await this.data.ensureAppUser(userId, appId)
    return this.data.appTransaction.findMany({
      where: { appEnvId, ...input },
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: { errors: true, appEnv: { include: { cluster: true } } },
    })
  }

  async userUpdateApp(userId: string, appId: string, data: AppUpdateInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.app.update({ where: { id: appId }, data, include: this.app.include })
  }

  async userUpdateAppEnv(userId: string, appId: string, appEnvId: string, data: AppEnvUpdateInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.appEnv.update({
      where: { id: appEnvId },
      data,
      include: {
        ...this.app.includeAppEnv,
        app: true,
      },
    })
  }

  async userUpdateAppMint(userId: string, appId: string, appMintId: string, data: AppMintUpdateInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.appMint.update({
      where: { id: appMintId },
      data,
    })
  }

  async userAppEnvMintDisable(userId: string, appId: string, appEnvId: string, mintId: string) {
    const appEnv = await this.userAppEnv(userId, appId, appEnvId)
    const found = appEnv.mints.find((item) => item.mint?.id === mintId)
    if (!found) {
      throw new BadRequestException(`AppEnv has no mint with id ${mintId}`)
    }

    if (found.mint?.default) {
      throw new BadRequestException(`Can't disable the default mint`)
    }

    return this.data.appEnv.update({
      where: { id: appEnvId },
      data: { mints: { disconnect: { id: found.id } } },
      include: this.app.includeAppEnv,
    })
  }

  async userAppEnvMintEnable(userId: string, appId: string, appEnvId: string, mintId: string) {
    const appEnv = await this.userAppEnv(userId, appId, appEnvId)
    const found = appEnv.mints.find((item) => item.mint?.id === mintId)
    if (found) {
      throw new BadRequestException(`AppEnv already has a mint with id ${mintId}`)
    }
    const mint = await this.data.mint.findUnique({ where: { id: mintId } })
    if (!mint) {
      throw new BadRequestException(`Mint with id ${mintId} not found`)
    }
    return this.data.appEnv.update({
      where: { id: appEnvId },
      data: {
        mints: {
          create: {
            mintId: mint.id,
            walletId: appEnv.wallets[0].id,
            order: mint?.order,
          },
        },
      },
      include: this.app.includeAppEnv,
    })
  }

  async userAppEnvMintSetWallet(userId: string, appId: string, appEnvId: string, mintId: string, walletId: string) {
    const appEnv = await this.userAppEnv(userId, appId, appEnvId)
    const found = appEnv.wallets.find((item) => item.id === walletId)
    if (!found) {
      throw new BadRequestException(`AppEnv has no wallet with id ${walletId}`)
    }

    await this.data.appMint.update({ where: { id: mintId }, data: { walletId } })
    return this.userAppEnv(userId, appId, appEnvId)
  }

  async userAppEnvWalletAdd(userId: string, appId: string, appEnvId: string, walletId: string) {
    const appEnv = await this.userAppEnv(userId, appId, appEnvId)
    const found = appEnv.wallets.find((item) => item.id === walletId)
    if (found) {
      throw new BadRequestException(`AppEnv already has a wallet with id ${walletId}`)
    }
    const wallet = await this.data.wallet.findUnique({ where: { id: walletId } })
    if (!wallet) {
      throw new BadRequestException(`Wallet with id ${walletId} not found`)
    }
    return this.data.appEnv.update({
      where: { id: appEnvId },
      data: { wallets: { connect: { id: wallet.id } } },
      include: this.app.includeAppEnv,
    })
  }

  async userAppEnvWalletRemove(userId: string, appId: string, appEnvId: string, walletId: string) {
    const appEnv = await this.userAppEnv(userId, appId, appEnvId)
    const found = appEnv.wallets.find((item) => item.id === walletId)
    if (!found) {
      throw new BadRequestException(`AppEnv has no wallet with id ${walletId}`)
    }
    const wallet = await this.data.wallet.findUnique({ where: { id: walletId } })
    if (!wallet) {
      throw new BadRequestException(`Wallet with id ${walletId} not found`)
    }
    return this.data.appEnv.update({
      where: { id: appEnvId },
      data: { wallets: { disconnect: { id: wallet.id } } },
      include: this.app.includeAppEnv,
    })
  }

  async userAppUserAdd(userId: string, appId: string, input: AppUserAddInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.app.update({
      where: { id: appId },
      data: { users: { create: { userId: input.userId, role: input.role } } },
      include: this.app.include,
    })
  }

  async userAppUserRemove(userId: string, appId: string, input: AppUserRemoveInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.app.update({
      where: { id: appId },
      data: { users: { deleteMany: { userId: input.userId } } },
      include: this.app.include,
    })
  }

  async userAppUserUpdateRole(userId: string, appId: string, input: AppUserUpdateRoleInput) {
    await this.data.ensureAppOwner(userId, appId)
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
      include: this.app.include,
    })
  }

  private allowAdmin = (role: UserRole, userId): Prisma.AppWhereInput => {
    return role !== UserRole.Admin ? { users: { some: { userId: userId } } } : {}
  }
}
