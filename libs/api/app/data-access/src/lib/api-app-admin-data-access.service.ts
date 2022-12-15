import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { UserRole } from '@kin-kinetic/api/user/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import slugify from 'slugify'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { AdminAppCreateInput } from './dto/admin-app-create.input'
import { AdminAppUpdateInput } from './dto/admin-app-update.input'
import { AppUserRole } from './entity/app-user-role.enum'

@Injectable()
export class ApiAppAdminDataAccessService implements OnModuleInit {
  private readonly logger = new Logger(ApiAppAdminDataAccessService.name)

  constructor(private readonly app: ApiAppDataAccessService, private readonly data: ApiCoreDataAccessService) {}

  async onModuleInit() {
    await this.configureProvisionedApps()
  }

  async adminCreateApp(userId: string, input: AdminAppCreateInput) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.getAppByIndex(input.index)
    if (app) {
      throw new BadRequestException(`App with index ${input.index} already exists`)
    }
    this.logger.verbose(`app ${input.index}: creating ${input.name}...`)
    const activeClusters = await this.data.getActiveClusters()

    const envs: Prisma.AppEnvCreateWithoutAppInput[] = []

    // Create an app environment for each active cluster
    for (const cluster of activeClusters) {
      const enabledMints = cluster.mints.filter((mint) => mint.default && mint.enabled)
      const mints: Prisma.AppMintCreateWithoutAppEnvInput[] = []
      const wallets = []
      for (const mint of enabledMints) {
        const generated = await this.data.generateAppWallet(userId, input.index)
        mints.push({
          addMemo: mint.addMemo,
          order: mint.order,
          mint: { connect: { id: mint.id } },
          wallet: { connect: { id: generated.id } },
        })
        wallets.push({ id: generated.id })
      }
      envs.push({
        // Connect the cluster
        cluster: { connect: { id: cluster.id } },
        // Set the slugified name based on the cluster name, so 'Solana Devnet' => 'devnet'
        name: slugify(cluster.name.toLowerCase().replace('solana', ''), { lower: true, strict: true }),
        // Connect the wallets
        wallets: { connect: wallets },
        // Create the default mint and connect it to the wallet
        mints: { create: mints },
        // Configure the default webhook settings if enabled
        ...(input.enableWebhooks
          ? {
              webhookBalanceEnabled: false,
              webhookBalanceUrl: 'http://localhost:9876/webhook/balance',
              webhookBalanceThreshold: '0.5',
              webhookDebugging: true,
              webhookEventEnabled: true,
              webhookEventUrl: 'http://localhost:9876/webhook/event',
              webhookVerifyEnabled: true,
              webhookVerifyUrl: 'http://localhost:9876/webhook/verify',
            }
          : undefined),
      })
    }

    const data: Prisma.AppCreateInput = {
      index: input.index,
      name: input.name,
      logoUrl: input.logoUrl,
      users: { create: { role: AppUserRole.Owner, userId } },
      envs: { create: envs },
    }

    const created = await this.data.app.create({
      data,
      include: {
        envs: {
          orderBy: { name: 'asc' },
          include: {
            app: true,
            cluster: true,
            mints: {
              orderBy: { order: 'asc' },
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

  async adminUpdateApp(userId: string, appId: string, input: AdminAppUpdateInput) {
    await this.ensureAppById(userId, appId)
    return this.data.app.update({
      data: { ...input },
      where: { id: appId },
    })
  }

  async adminDeleteApp(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    await this.data.appUser.deleteMany({ where: { appId } })
    await this.data.transactionError.deleteMany({ where: { transaction: { appEnv: { appId } } } })
    await this.data.transaction.deleteMany({ where: { appEnv: { appId } } })
    await this.data.webhook.deleteMany({ where: { appEnv: { appId } } })
    await this.data.appEnv.deleteMany({ where: { appId } })
    return this.data.app.delete({ where: { id: appId } })
  }

  async adminApps(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.app.findMany({
      include: this.app.include,
      orderBy: { updatedAt: 'desc' },
    })
  }

  async adminApp(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.getAppById(appId)
  }

  async ensureAppById(userId: string, appId: string) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.app.findUnique({ where: { id: appId } })
    if (!app) {
      throw new NotFoundException(`App with id ${appId} does not exist.`)
    }
    return app
  }

  private async configureProvisionedApps() {
    await this.data.configureDefaultData()
    let adminId
    return Promise.all(
      this.data.config.provisionedApps.map(async (app) => {
        const found = await this.data.getAppByIndex(app.index)
        if (found) {
          const { publicKey } = Keypair.fromSecret(app.secret)
          this.logger.log(
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
          await this.adminCreateApp(adminId, {
            index: app.index,
            name: app.name,
            logoUrl: app?.logoUrl,
            enableWebhooks: app?.enableWebhooks,
          })
        }
      }),
    )
  }
}
