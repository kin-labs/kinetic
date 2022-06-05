import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { UserRole } from '@mogami/api/user/data-access'
import { ApiWalletDataAccessService } from '@mogami/api/wallet/data-access'
import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { AppWebhookType, Prisma } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Keypair } from '@solana/web3.js'
import { Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { AppCreateInput } from './dto/app-create.input'
import { AppEnvUpdateInput } from './dto/app-env-update.input'
import { AppUpdateInput } from './dto/app-update.input'
import { AppUserAddInput } from './dto/app-user-add.input'
import { AppUserRemoveInput } from './dto/app-user-remove.input'
import { AppUserUpdateRoleInput } from './dto/app-user-update-role.input'
import { AppConfig } from './entity/app-config.entity'
import { AppHealth } from './entity/app-health.entity'
import { AppUserRole } from './entity/app-user-role.enum'
import { AppWebhookDirection } from './entity/app-webhook-direction.enum'

function isValidAppWebhookType(type: string) {
  return Object.keys(AppWebhookType)
    .map((item) => item.toLowerCase())
    .includes(type.toLowerCase())
}

@Injectable()
export class ApiAppDataAccessService implements OnModuleInit {
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

  private readonly logger = new Logger(ApiAppDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService, private readonly wallet: ApiWalletDataAccessService) {}

  async onModuleInit() {
    await this.configureProvisionedApps()
  }

  async createApp(userId: string, input: AppCreateInput) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.getAppByIndex(input.index)
    if (app) {
      throw new BadRequestException(`App with index ${input.index} already exists`)
    }
    const clusters = await this.data.getActiveClusters()
    this.logger.verbose(`app ${input.index}: creating ${input.name}...`)
    let wallets
    if (!input.skipWalletCreation) {
      const generated = await this.wallet.generateWallet(userId, input.index)
      wallets = { connect: { id: generated.id } }
      this.logger.verbose(`app ${input.index}: connecting wallet ${generated.publicKey}...`)
    }

    const data: Prisma.AppCreateInput = {
      index: input.index,
      name: input.name,
      users: { create: { role: AppUserRole.Owner, userId } },
      envs: {
        // Create an app environment for each active cluster
        create: [
          ...clusters.map((cluster) => ({
            // Connect the cluster
            cluster: { connect: { id: cluster.id } },
            // Set the name based on the type, so 'SolanaDevnet' => 'devnet'
            name: cluster.type.toLowerCase().replace('solana', ''),
            // Connect the wallet
            wallets,
            // Create the default mint and connect it to the wallet
            mints: {
              create: cluster.mints
                .filter((mint) => mint.address === process.env['DEFAULT_MINT_PUBLIC_KEY'] || mint.symbol === 'KIN')
                .map((mint) => ({
                  mint: { connect: { id: mint.id } },
                  wallet: wallets,
                })),
            },
          })),
        ],
      },
    }
    const created = await this.data.app.create({
      data,
      include: {
        envs: {
          include: {
            cluster: true,
            mints: {
              include: {
                mint: true,
                wallet: true,
              },
            },
            wallets: true,
          },
        },
        users: true,
      },
    })
    this.logger.verbose(
      `Created app ${created.index} (${created.name}): ${created.envs
        .map((env) => `=> ${env.name}: ${env.mints.map((mint) => mint.mint.symbol).join(', ')}`)
        .join(', ')}`,
    )
    return created
  }

  async deleteApp(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    await this.data.appUser.deleteMany({ where: { appId } })
    await this.data.appTransactionError.deleteMany({ where: { appTransaction: { appEnv: { appId } } } })
    await this.data.appTransaction.deleteMany({ where: { appEnv: { appId } } })
    await this.data.appWebhook.deleteMany({ where: { appEnv: { appId } } })
    await this.data.appEnv.deleteMany({ where: { appId } })
    return this.data.app.delete({ where: { id: appId } })
  }

  async apps(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.app.findMany({
      include: this.include,
      orderBy: { updatedAt: 'desc' },
    })
  }

  async app(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.getAppById(appId)
  }

  async appEnv(userId: string, appId: string, appEnvId: string) {
    await this.ensureAppById(userId, appId)
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

  async appTransaction(userId: string, appId: string, appEnvId: string, appTransactionId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.appTransaction.findFirst({
      where: { id: appTransactionId, appEnvId },
      include: { errors: true },
    })
  }

  async appTransactions(userId: string, appId: string, appEnvId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.appTransaction.findMany({
      where: { appEnvId },
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: { errors: true },
    })
  }

  async appWebhook(userId: string, appId: string, appWebhookId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.appWebhook.findUnique({
      where: { id: appWebhookId },
    })
  }

  async appWebhooks(userId: string, appId: string, appEnvId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.appWebhook.findMany({
      where: { appEnvId },
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

  async updateAppEnv(userId: string, appId: string, appEnvId: string, data: AppEnvUpdateInput) {
    await this.ensureAppById(userId, appId)

    return this.data.appEnv.update({
      where: { id: appEnvId },
      data,
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

  private async ensureAppById(userId: string, appId: string) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.app.findUnique({ where: { id: appId } })
    if (!app) {
      throw new NotFoundException(`App with id ${appId} does not exist.`)
    }
    return app
  }

  async appEnvWalletAdd(userId: string, appId: string, appEnvId: string, walletId: string) {
    const appEnv = await this.appEnv(userId, appId, appEnvId)
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
      include: this.includeAppEnv,
    })
  }

  async appEnvWalletRemove(userId: string, appId: string, appEnvId: string, walletId: string) {
    const appEnv = await this.appEnv(userId, appId, appEnvId)
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
      include: this.includeAppEnv,
    })
  }

  async getAppConfig(environment: string, index: number): Promise<AppConfig> {
    const appKey = this.data.getAppKey(environment, index)
    const env = await this.data.getAppByEnvironmentIndex(environment, index)

    const mints = env?.mints?.map(({ mint, wallet }) => ({
      airdrop: !!mint.airdropSecretKey,
      airdropAmount: mint.airdropAmount,
      airdropMax: mint.airdropMax,
      feePayer: wallet.publicKey,
      logoUrl: mint?.logoUrl,
      programId: TOKEN_PROGRAM_ID.toBase58(),
      publicKey: mint?.address,
      symbol: mint?.symbol,
    }))

    if (!mints.length) {
      throw new Error(`${appKey}: no mints found.`)
    }

    return {
      app: {
        index: env.app.index,
        name: env.app.name,
      },
      environment: {
        name: env.name,
        cluster: {
          id: env.cluster.id,
          name: env.cluster.name,
          type: env.cluster.type,
        },
      },
      mint: mints[0],
      mints,
    }
  }

  async getAppHealth(environment: string, index: number): Promise<AppHealth> {
    const isMogamiOk = true
    const solana = await this.data.getSolanaConnection(environment, index)

    const isSolanaOk = await solana.healthCheck()

    return {
      isSolanaOk,
      isMogamiOk,
      time: new Date(),
    }
  }

  async storeIncomingWebhook(
    environment: string,
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
      const appEnv = await this.data.getAppByEnvironmentIndex(environment, index)
      if (!appEnv.webhookAcceptIncoming) {
        this.logger.warn(`storeIncomingWebhook ignoring request, webhookAcceptIncoming is disabled`)
        res.statusCode = 400
        return res.send(new Error(`webhookAcceptIncoming is disabled`))
      }

      // Store the incoming webhook
      const created = await this.data.appWebhook.create({
        data: {
          direction: AppWebhookDirection.Incoming,
          appEnvId: appEnv.id,
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

  private async configureProvisionedApps() {
    await this.data.configureDefaultData()
    let adminId
    return Promise.all(
      this.data.config.provisionedApps.map(async (app) => {
        const found = await this.data.getAppByIndex(app.index)
        if (found) {
          const { publicKey } = Keypair.fromSecretKey(Buffer.from(app.feePayerByteArray))
          this.logger.verbose(
            `Provisioned app ${app.index} (${app.name}) found: ${publicKey} ${found.envs
              .map((env) => `=> ${env.name}: ${env.mints.map((mint) => mint.mint.symbol).join(', ')}`)
              .join(', ')}`,
          )
        } else {
          if (!adminId) {
            const admin = await this.data.user.findFirst({
              where: { role: UserRole.Admin },
              orderBy: { createdAt: 'asc' },
            })
            adminId = admin.id
          }
          await this.createApp(adminId, { index: app.index, name: app.name })
        }
      }),
    )
  }
}
