import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { ApiWalletDataAccessService } from '@mogami/api/wallet/data-access'
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { AppWebhookType, Prisma } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { AppCreateInput } from './dto/app-create.input'
import { AppUpdateInput } from './dto/app-update.input'
import { AppUserAddInput } from './dto/app-user-add.input'
import { AppUserRemoveInput } from './dto/app-user-remove.input'
import { AppUserUpdateRoleInput } from './dto/app-user-update-role.input'
import { AppConfig } from './entity/app-config.entity'
import { AppUserRole } from './entity/app-user-role.enum'
import { AppWebhookDirection } from './entity/app-webhook-direction.enum'

function isValidAppWebhookType(type: string) {
  return Object.keys(AppWebhookType)
    .map((item) => item.toLowerCase())
    .includes(type.toLowerCase())
}

@Injectable()
export class ApiAppDataAccessService {
  private include: Prisma.AppInclude = { users: { include: { user: true } }, wallet: true }
  private readonly logger = new Logger(ApiAppDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService, private readonly wallet: ApiWalletDataAccessService) {}

  async createApp(userId: string, input: AppCreateInput) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.getAppByIndex(input.index)
    if (app) {
      throw new BadRequestException(`App with index ${input.index} already exists`)
    }
    let wallet
    if (!input.skipWalletCreation) {
      const generated = await this.wallet.generateWallet(userId, input.index)
      wallet = { connect: { id: generated.id } }
    }
    const data: Prisma.AppCreateInput = {
      index: input.index,
      name: input.name,
      users: { create: { role: AppUserRole.Owner, userId } },
      wallet,
    }
    const created = await this.data.app.create({ data, include: this.include })
    this.logger.verbose(`Created app "${created.name}" with index ${created.index}.`)
    return created
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

  app(userId: string, appId: string) {
    return this.ensureAppById(userId, appId)
  }

  async appTransaction(userId: string, appId: string, appTransactionId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.appTransaction.findUnique({
      where: { id: appTransactionId },
    })
  }

  async appTransactions(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.appTransaction.findMany({
      where: { appId },
      take: 100,
      orderBy: { updatedAt: 'desc' },
    })
  }

  async appWebhook(userId: string, appId: string, appWebhookId: string) {
    await this.ensureAppById(userId, appId)
    const data = await this.data.appWebhook.findUnique({
      where: { id: appWebhookId },
    })
    console.log('data', data)
    return this.data.appWebhook.findUnique({
      where: { id: appWebhookId },
    })
  }

  async appWebhooks(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.appWebhook.findMany({
      where: { appId },
      take: 100,
      orderBy: { updatedAt: 'desc' },
    })
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

  async getConfig(index: number): Promise<AppConfig> {
    const { name, wallet } = await this.data.getAppByIndex(index)

    return {
      app: {
        index,
        name,
      },
      mint: {
        feePayer: wallet.publicKey,
        programId: TOKEN_PROGRAM_ID.toBase58(),
        publicKey: this.data.config.mogamiMintPublicKey,
      },
    }
  }

  async storeIncomingWebhook(
    index: number,
    type: string,
    headers: IncomingHttpHeaders,
    payload: object,
    res: Response,
  ) {
    // Make sure the webhook type is valid
    if (!isValidAppWebhookType(type)) {
      res.statusCode = 400
      return res.send(new BadRequestException(`Unknown AppWebhookType`))
    }

    try {
      // Get the app by Index
      const app = await this.data.getAppByIndex(index)
      if (!app.webhookAcceptIncoming) {
        this.logger.warn(`storeIncomingWebhook ignoring request, webhookAcceptIncoming is disabled`)
        res.statusCode = 400
        return res.send(new Error(`webhookAcceptIncoming is disabled`))
      }

      // Store the incoming webhook
      const created = await this.data.appWebhook.create({
        data: {
          direction: AppWebhookDirection.Incoming,
          appId: app.id,
          headers,
          payload,
          type: type === 'event' ? AppWebhookType.Event : AppWebhookType.Verify,
        },
      })
      res.statusCode = 200
      return res.send(created)
    } catch (e) {
      res.statusCode = 400
      return res.send(new BadRequestException(`Something went wrong storing incoming webhook`))
    }
  }
}
