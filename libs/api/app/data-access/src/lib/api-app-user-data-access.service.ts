import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { UserRole } from '@kin-kinetic/api/user/data-access'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import slugify from 'slugify'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { UserAppEnvCreateInput } from './dto/user-app-env-create.input'
import { UserAppEnvUpdateInput } from './dto/user-app-env-update.input'
import { UserAppMintUpdateInput } from './dto/user-app-mint-update.input'
import { UserAppTransactionListInput } from './dto/user-app-transaction-list.input'
import { UserAppUpdateInput } from './dto/user-app-update.input'
import { UserAppUserAddInput } from './dto/user-app-user-add.input'
import { UserAppUserRemoveInput } from './dto/user-app-user-remove.input'
import { UserAppUserUpdateRoleInput } from './dto/user-app-user-update-role.input'
import { AppTransactionCounter } from './entity/app-transaction-counter.entity'

@Injectable()
export class ApiAppUserDataAccessService {
  private readonly logger = new Logger(ApiAppUserDataAccessService.name)
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

  private userAppTransactionsWhere(
    appEnvId: string,
    input: UserAppTransactionListInput = {},
  ): Prisma.AppTransactionWhereInput {
    const { destination, ip, referenceId, referenceType, signature, source, status, ua } = input
    return {
      appEnvId,
      destination,
      ip,
      referenceId,
      referenceType,
      signature,
      source,
      status: status?.length ? { in: status } : undefined,
      ua,
    }
  }

  private userAppTransactionsLimit(input: UserAppTransactionListInput = {}) {
    const page = input.page && input.page > 0 ? input.page : 1
    const take = input.limit && input.limit > 0 ? input.limit : 10
    const skip = take * page - take
    return {
      page,
      take,
      skip: skip > 0 ? skip : 0,
    }
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

  async userAppTransactions(userId: string, appId: string, appEnvId: string, input: UserAppTransactionListInput = {}) {
    await this.data.ensureAppUser(userId, appId)
    const { skip, take } = this.userAppTransactionsLimit(input)
    return this.data.appTransaction.findMany({
      include: { errors: true, appEnv: { include: { cluster: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
      where: this.userAppTransactionsWhere(appEnvId, input),
    })
  }

  async userAppTransactionCounter(
    userId: string,
    appId: string,
    appEnvId: string,
    input: UserAppTransactionListInput = {},
  ): Promise<AppTransactionCounter> {
    await this.data.ensureAppUser(userId, appId)
    const total = await this.data.appTransaction.count({
      where: this.userAppTransactionsWhere(appEnvId, input),
    })
    const { page, take } = this.userAppTransactionsLimit(input)
    const pageCount = Math.ceil(total / take)
    return {
      page,
      pageCount,
      limit: take,
      total,
    }
  }

  async userUpdateApp(userId: string, appId: string, data: UserAppUpdateInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.app.update({ where: { id: appId }, data, include: this.app.include })
  }

  async userCreateAppEnv(userId: string, appId: string, clusterId: string, data: UserAppEnvCreateInput) {
    await this.data.ensureAppOwner(userId, appId)
    const app = await this.data.getAppById(appId)
    if (app.envs.length >= app.maxEnvs) {
      this.logger.warn(`User ${userId} reached max number of environments for app ${appId}`)
      throw new Error(
        `The maximum number of environments has been reached for this app. Please contact your administrator to increase the maximum.`,
      )
    }
    const activeClusters = await this.data.getActiveClusters()
    const cluster = activeClusters.find((cluster) => cluster.id === clusterId)

    if (!cluster) {
      throw new BadRequestException(`Cluster not found or Inactive`)
    }

    const enabledMints = cluster.mints.filter((mint) => mint.default && mint.enabled)
    const mints = []
    const wallets = []
    for (const mint of enabledMints) {
      const generated = await this.data.generateAppWallet(userId, app.index)
      mints.push({
        addMemo: mint.addMemo,
        order: mint.order,
        mint: { connect: { id: mint.id } },
        wallet: { connect: { id: generated.id } },
      })
      wallets.push({ id: generated.id })
    }

    return this.data.appEnv.create({
      data: {
        // Connect the app
        app: { connect: { id: app.id } },
        // Connect the cluster
        cluster: { connect: { id: cluster.id } },
        // Set the slugified name based on the input name
        name: slugify(data.name.toLowerCase(), { lower: true, strict: true }),
        // Connect the wallets
        wallets: { connect: wallets },
        // Create the default mint and connect it to the wallet
        mints: { create: mints },
      },
      include: {
        ...this.app.includeAppEnv,
        app: true,
      },
    })
  }

  async userUpdateAppEnv(userId: string, appId: string, appEnvId: string, data: UserAppEnvUpdateInput) {
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

  async userUpdateAppMint(userId: string, appId: string, appMintId: string, data: UserAppMintUpdateInput) {
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

  async userAppUserAdd(userId: string, appId: string, input: UserAppUserAddInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.app.update({
      where: { id: appId },
      data: { users: { create: { userId: input.userId, role: input.role } } },
      include: this.app.include,
    })
  }

  async userAppUserRemove(userId: string, appId: string, input: UserAppUserRemoveInput) {
    await this.data.ensureAppOwner(userId, appId)
    return this.data.app.update({
      where: { id: appId },
      data: { users: { deleteMany: { userId: input.userId } } },
      include: this.app.include,
    })
  }

  async userAppUserUpdateRole(userId: string, appId: string, input: UserAppUserUpdateRoleInput) {
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
