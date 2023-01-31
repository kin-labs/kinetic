import { AirdropConfig } from '@kin-kinetic/api/airdrop/util'
import { hashPassword } from '@kin-kinetic/api/auth/util'
import { ProvisionedCluster } from '@kin-kinetic/api/cluster/util'
import { ApiConfigService } from '@kin-kinetic/api/config/data-access'
import { parseAppKey } from '@kin-kinetic/api/core/util'
import { Keypair } from '@kin-kinetic/keypair'
import { getPublicKey } from '@kin-kinetic/solana'
import { Injectable, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import {
  App,
  AppEnv,
  AppUserRole,
  Cluster,
  ClusterStatus,
  Mint,
  Prisma,
  PrismaClient,
  UserIdentityType,
  UserRole,
  Wallet,
  WalletType,
} from '@prisma/client'
import { MetricService } from 'nestjs-otel'
import { ApiCoreCacheService } from './cache/api-core-cache.service'
import { MigrationStatus } from './entities/migration-status.entity'
import { Migration } from './entities/migration.entity'

export type AppEnvironment = AppEnv & {
  app: App
  cluster: Cluster
  mints: { addMemo: boolean; mint: Mint; wallet: Wallet }[]
  wallets: Wallet[]
}

@Injectable()
export class ApiCoreService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreService.name)
  readonly airdropConfig = new Map<string, Omit<AirdropConfig, 'connection'>>()

  private getAppByEnvironmentIndexCounter: Counter
  private getAppByIndexCounter: Counter

  constructor(readonly cache: ApiCoreCacheService, readonly config: ApiConfigService, readonly metrics: MetricService) {
    super()
  }

  uptime() {
    return process.uptime()
  }

  async onModuleInit() {
    this.getAppByEnvironmentIndexCounter = this.metrics.getCounter('api_core_get_app_by_environment_index_counter', {
      description: 'Number of requests to getAppByEnvironmentIndex',
    })
    this.getAppByIndexCounter = this.metrics.getCounter('api_core_get_app_by_index_counter', {
      description: 'Number of requests to getAppByIndex',
    })
    await this.$connect()
    this.migrations().then((migrations) => {
      migrations.map(({ key, status: { done }, version }) => {
        if (!done) {
          this.logger.warn(`Pending migration: ${key} (${version}). Please run this migration.`)
        } else {
          this.logger.verbose(`Migration applied: ${key} (${version}).`)
        }
      })
    })
  }

  async ensureAdminUser(userId: string) {
    const user = await this.getUserById(userId)
    if (user.role !== UserRole.Admin) {
      throw new Error(`Admin role required.`)
    }
    return user
  }

  async ensureApp(appId: string): Promise<App> {
    const app = await this.app.findUnique({ where: { id: appId } })
    if (!app) {
      throw new NotFoundException(`App with id ${appId} does not exist.`)
    }
    return app
  }

  async ensureAppOwner(userId: string, appId: string): Promise<AppUserRole> {
    const role = await this.ensureAppUser(userId, appId)
    if (role !== AppUserRole.Owner) {
      throw new UnauthorizedException(`User ${userId} does not have Owner access to app ${appId}.`)
    }
    return role
  }

  async ensureAppUser(userId: string, appId: string): Promise<AppUserRole> {
    await this.ensureApp(appId)
    const user = await this.getUserById(userId)
    if (user.role === UserRole.Admin) {
      return AppUserRole.Owner
    }
    const appUser = await this.appUser.findFirst({ where: { appId, userId } })
    if (!appUser) {
      throw new NotFoundException(`User ${userId} does not have access to app ${appId}.`)
    }
    return appUser?.role
  }

  async generateAppWallet(userId: string, index: number) {
    const { publicKey, secretKey } = this.getAppKeypair(index)

    return this.wallet.create({ data: { secretKey, publicKey, type: WalletType.Provisioned, ownerId: userId } })
  }

  getAirdropConfig(mint: Mint, cluster: Cluster) {
    if (!this.airdropConfig.get(mint.id)) {
      if (!mint.airdropSecretKey) {
        throw new Error(`Airdrop secret key not set for mint ${mint.id}.`)
      }
      const feePayer = Keypair.fromSecret(mint.airdropSecretKey).solana
      this.airdropConfig.set(mint.id, {
        airdropAmount: mint.airdropAmount || 1000,
        airdropMax: mint.airdropMax || 50000,
        decimals: mint.decimals,
        feePayer,
        mint: getPublicKey(mint.address),
      })
      this.logger.log(
        `[${cluster.name}/${mint.symbol}] Configured Airdrop wallet ${feePayer.publicKey.toBase58()} for ${
          mint.name
        } (${mint.decimals} decimals) (${mint?.address})`,
      )
    }
    return this.airdropConfig.get(mint.id)
  }

  private getAppKeypair(index: number): Keypair {
    const envVar = process.env[`APP_${index}_FEE_PAYER_SECRET`] || process.env[`APP_${index}_FEE_PAYER_BYTE_ARRAY`]
    if (envVar) {
      this.logger.verbose(`getAppKeypair app ${index}: read from env var`)
      return Keypair.fromSecret(envVar)
    }
    this.logger.verbose(`getAppKeypair app ${index}: generated new keypair`)
    return Keypair.random()
  }

  getActiveClusters() {
    return this.cluster.findMany({
      where: { status: ClusterStatus.Active },
      include: { mints: { orderBy: { order: 'asc' } } },
    })
  }

  getAppById(id: string) {
    return this.app.findUnique({
      where: { id },
      include: {
        envs: {
          orderBy: { name: 'asc' },
          include: {
            cluster: true,
            mints: {
              include: {
                mint: true,
                wallet: true,
              },
              orderBy: { order: 'asc' },
            },
            wallets: true,
          },
        },
        users: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  getAppEnvironmentByAppKey(appKey: string): Promise<AppEnvironment> {
    const { environment, index } = parseAppKey(appKey)
    this.getAppByEnvironmentIndexCounter?.add(1, { appKey })
    return this.appEnv.findFirst({
      where: { app: { index }, name: environment },
      include: {
        app: true,
        cluster: true,
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

  getAppByIndex(index: number) {
    this.getAppByIndexCounter?.add(1, { index: `${index}` })
    return this.app.findUnique({
      where: { index },
      include: {
        envs: {
          orderBy: { name: 'asc' },
          include: {
            cluster: true,
            mints: {
              include: {
                mint: true,
                wallet: true,
              },
              orderBy: { order: 'asc' },
            },
            wallets: true,
          },
        },
        users: true,
      },
    })
  }

  getAppEnvById(appEnvId: string) {
    return this.appEnv.findUnique({ where: { id: appEnvId }, include: { app: true } })
  }

  async getUserByEmail(email: string) {
    const found = await this.userEmail.findUnique({ where: { email } })

    if (found) {
      return this.getUserById(found.ownerId)
    }
  }

  getUserById(userId: string) {
    return this.user.findUnique({ where: { id: userId }, include: { emails: true, identities: true } })
  }

  async getUserByIdentity(type: UserIdentityType, externalId: string) {
    return this.user.findFirst({
      where: { identities: { some: { type, externalId } } },
      include: { emails: true, identities: true },
    })
  }

  getUserByUsername(username: string) {
    return this.user.findUnique({ where: { username }, include: { emails: true, identities: true } })
  }

  async configureDefaultData() {
    await this.configureDefaultUsers()
    await this.configureDefaultClusters()
  }

  private async configureDefaultUsers() {
    for (const user of this.config.authUsers) {
      await this.configureDefaultUser(user)
    }
  }

  private async configureDefaultUser({
    avatarUrl,
    email,
    username,
    password,
    role,
  }: {
    avatarUrl?: string
    email?: string
    username: string
    password: string
    role: UserRole
  }) {
    const existing = await this.user.count({ where: { username } })
    if (existing < 1) {
      await this.user.create({
        data: {
          avatarUrl,
          password: password ? hashPassword(password) : undefined,
          role,
          username: username,
          emails: email
            ? {
                create: { email },
              }
            : undefined,
        },
      })
      this.logger.log(`Provisioned ${role} ${username} ${password ? 'and password' : 'an external provider'}`)
      return
    }
    this.logger.log(`Log in with ${role} ${username} ${password ? 'and password' : 'an external provider'}`)
  }

  private async configureDefaultClusters() {
    return Promise.all(
      this.config.provisionedClusters.filter((cluster) => !!cluster).map((item) => this.configureDefaultCluster(item)),
    )
  }

  private async configureDefaultCluster(item: ProvisionedCluster) {
    const { mints, ...cluster } = item
    const existing = await this.cluster.findUnique({ where: { id: cluster.id } })

    if (existing) {
      this.logger.log(`Cluster ${existing.name} already configured: (${existing.status})`)
      return
    }

    return this.cluster.create({ data: cluster }).then((res) => {
      this.logger.log(`Configured cluster ${res.name} (${res.status})`)
      return this.configureMints(mints)
    })
  }

  private async configureMints(mints: Prisma.MintCreateInput[]) {
    return Promise.all(
      mints.map((mint) =>
        this.mint.upsert({
          where: { id: mint.id },
          update: { ...mint },
          create: { ...mint },
          include: { cluster: true },
        }),
      ),
    )
  }

  async deleteAppEnv(appId: string, appEnvId: string) {
    await this.webhook.deleteMany({ where: { appEnv: { appId, id: appEnvId } } })
    await this.transactionError.deleteMany({ where: { transaction: { appEnv: { appId, id: appEnvId } } } })
    await this.transaction.deleteMany({ where: { appEnv: { appId, id: appEnvId } } })
    return this.appEnv.delete({ where: { id: appEnvId } })
  }

  // This migration system will be replaced with a more robust one in the future
  private readonly migrationList = [
    { key: 'references', version: 'v1.0.0-rc.17' },
    { key: 'wallet-balances', version: 'v1.0.0-rc.17' },
  ]

  private findMigration(key: string) {
    const found = this.migrationList.find((item) => item.key === key)
    if (!found) {
      throw new Error(`Unknown migration key: ${key}`)
    }
    return found
  }

  async migrations(): Promise<Migration[]> {
    return Promise.all(
      this.migrationList.map(async (item) => {
        const status = await this.migrationStatus(item.key)
        return { ...item, status }
      }),
    )
  }

  async migrate(key: string): Promise<MigrationStatus> {
    const status = await this.migrationStatus(key)
    if (status.done) {
      return status
    }

    const migration = this.findMigration(key)
    switch (migration.key) {
      case 'references':
        await this.migrateReferences()
        return this.migrationStatus(key)
      case 'wallet-balances':
        await this.migrateWalletBalances()
        return this.migrationStatus(key)
    }
    throw new Error(`Migration does not exist: ${key}`)
  }

  private async migrationStatus(key: string): Promise<MigrationStatus> {
    const migration = this.findMigration(key)

    switch (migration.key) {
      case 'references': {
        const count = await this.migrateReferencesCount()
        return { count, done: count === 0 }
      }
      case 'wallet-balances': {
        const count = await this.migrateWalletBalancesCount()
        return { count, done: count === 0 }
      }
    }
    throw new Error(`Migration does not exist: ${key}`)
  }

  private async migrateReferences(): Promise<void> {
    // This migration combines the referenceId and referenceType fields into a single reference field
    const count = await this.migrateReferencesCount()

    if (!count) {
      this.logger.verbose('migrateTransactionReferences: no transactions to migrate')
      return
    }

    const batchSize = 100
    const batches = Math.ceil(count / batchSize)
    this.logger.verbose(`migrateTransactionReferences: migrating ${count} transactions in ${batches} batches`)

    for (let i = 0; i < batches; i++) {
      const transactions = await this.transaction.findMany({
        where: {
          OR: [{ referenceId: { not: null } }, { referenceType: { not: null } }],
        },
        take: batchSize,
      })

      this.logger.verbose(
        `migrateTransactionReferences: migrating ${transactions.length} transactions in batch ${i}/${batches}`,
      )

      const updates: { id: string; data: Prisma.TransactionUpdateInput }[] = transactions.map((tx) => {
        let reference = null
        if (tx.referenceId && tx.referenceType) {
          reference = `${tx.referenceType}|${tx.referenceId}`
        } else if (tx.referenceId && !tx.referenceType) {
          reference = `${tx.referenceId}`
        } else if (!tx.referenceId && tx.referenceType) {
          reference = `${tx.referenceType}`
        }
        return {
          id: tx.id,
          data: { reference, referenceId: null, referenceType: null },
        }
      })

      const updated = await Promise.all(
        updates.map(async (update) => {
          return this.transaction.update({
            where: { id: update.id },
            data: update.data,
          })
        }),
      )

      this.logger.verbose(
        `migrateTransactionReferences: updated ${updated.length} transactions in batch ${i}/${batches}`,
      )
    }
  }

  private async migrateReferencesCount(): Promise<number> {
    return this.transaction.count({
      where: {
        OR: [{ referenceId: { not: null } }, { referenceType: { not: null } }],
      },
    })
  }

  private async migrateWalletBalances(): Promise<void> {
    // The wallet balance history will no longer be stored in the database
    // Any old records will be deleted
    const balances = await this.migrateWalletBalancesCount()
    if (balances > 0) {
      this.logger.warn(`MIGRATION: Deleting ${balances} wallet balance records`)
      await this.walletBalance.deleteMany()
    }
  }
  private migrateWalletBalancesCount(): Promise<number> {
    return this.walletBalance.count()
  }
}
