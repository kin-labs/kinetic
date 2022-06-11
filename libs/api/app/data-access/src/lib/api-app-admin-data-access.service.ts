import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { UserRole } from '@mogami/api/user/data-access'
import { ApiWalletUserDataAccessService } from '@mogami/api/wallet/data-access'
import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Keypair } from '@solana/web3.js'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { AppCreateInput } from './dto/app-create.input'
import { AppUserRole } from './entity/app-user-role.enum'

@Injectable()
export class ApiAppAdminDataAccessService implements OnModuleInit {
  private readonly logger = new Logger(ApiAppAdminDataAccessService.name)

  constructor(
    private readonly app: ApiAppDataAccessService,
    private readonly data: ApiCoreDataAccessService,
    private readonly wallet: ApiWalletUserDataAccessService,
  ) {}

  async onModuleInit() {
    await this.configureProvisionedApps()
  }

  async adminCreateApp(userId: string, input: AppCreateInput) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.getAppByIndex(input.index)
    if (app) {
      throw new BadRequestException(`App with index ${input.index} already exists`)
    }
    const clusters = await this.data.getActiveClusters()
    this.logger.verbose(`app ${input.index}: creating ${input.name}...`)
    let wallets
    if (!input.skipWalletCreation) {
      const generated = await this.wallet.userGenerateWallet(userId, input.index)
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

  async adminDeleteApp(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    await this.data.appUser.deleteMany({ where: { appId } })
    await this.data.appTransactionError.deleteMany({ where: { appTransaction: { appEnv: { appId } } } })
    await this.data.appTransaction.deleteMany({ where: { appEnv: { appId } } })
    await this.data.appWebhook.deleteMany({ where: { appEnv: { appId } } })
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

  private async ensureAppById(userId: string, appId: string) {
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
          await this.adminCreateApp(adminId, { index: app.index, name: app.name })
        }
      }),
    )
  }
}
