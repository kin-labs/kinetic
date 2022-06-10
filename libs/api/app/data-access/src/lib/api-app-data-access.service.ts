import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { Prisma } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AppEnvUpdateInput } from './dto/app-env-update.input'
import { AppTransactionListInput } from './dto/app-transaction-list.input'
import { AppUpdateInput } from './dto/app-update.input'
import { AppUserAddInput } from './dto/app-user-add.input'
import { AppUserRemoveInput } from './dto/app-user-remove.input'
import { AppUserUpdateRoleInput } from './dto/app-user-update-role.input'
import { AppConfig } from './entity/app-config.entity'
import { AppHealth } from './entity/app-health.entity'

@Injectable()
export class ApiAppDataAccessService implements OnModuleInit {
  readonly includeAppEnv: Prisma.AppEnvInclude = {
    cluster: true,
    mints: {
      include: {
        mint: true,
        wallet: true,
      },
    },
    wallets: true,
  }
  readonly include: Prisma.AppInclude = {
    users: { include: { user: true } },
    envs: {
      include: this.includeAppEnv,
    },
  }

  private readonly logger = new Logger(ApiAppDataAccessService.name)
  private getAppConfigErrorCounter: Counter
  private getAppConfigSuccessCounter: Counter

  constructor(private readonly data: ApiCoreDataAccessService) {}

  async onModuleInit() {
    this.getAppConfigErrorCounter = this.data.metrics.getCounter('api_app_get_app_config_error_counter', {
      description: 'Number of getAppConfig errors',
    })
    this.getAppConfigSuccessCounter = this.data.metrics.getCounter('api_app_get_app_config_success_counter', {
      description: 'Number of getAppConfig success',
    })
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

  async appTransactions(userId: string, appId: string, appEnvId: string, input: AppTransactionListInput = {}) {
    await this.ensureAppById(userId, appId)
    return this.data.appTransaction.findMany({
      where: { appEnvId, ...input },
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
    if (!env) {
      this.getAppConfigErrorCounter.add(1, { appKey })
      throw new NotFoundException(`App not found :(`)
    }
    this.getAppConfigSuccessCounter.add(1, { appKey })
    this.logger.verbose(`getAppConfig ${appKey}`)
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

    if (!mints?.length) {
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
}
