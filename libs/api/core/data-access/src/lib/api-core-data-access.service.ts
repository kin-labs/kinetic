import { AirdropConfig } from '@kin-kinetic/airdrop'
import { hashPassword } from '@kin-kinetic/api/auth/util'
import { ApiConfigDataAccessService } from '@kin-kinetic/api/config/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { getPublicKey, Solana } from '@kin-kinetic/solana'
import { Injectable, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { App, AppEnv, AppUserRole, Cluster, ClusterStatus, Mint, PrismaClient, UserRole, Wallet } from '@prisma/client'
import { omit } from 'lodash'
import { MetricService } from 'nestjs-otel'

type AppEnvironment = AppEnv & {
  app: App
  cluster: Cluster
  mints: { addMemo: boolean; mint: Mint; wallet: Wallet }[]
  wallets: Wallet[]
}

@Injectable()
export class ApiCoreDataAccessService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataAccessService.name)
  readonly airdropConfig = new Map<string, Omit<AirdropConfig, 'connection'>>()
  readonly connections = new Map<string, Solana>()

  private getAppByEnvironmentIndexCounter: Counter
  private getAppByIndexCounter: Counter

  constructor(readonly config: ApiConfigDataAccessService, readonly metrics: MetricService) {
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

  async getAppEnvironment(environment: string, index: number): Promise<{ appEnv: AppEnvironment; appKey: string }> {
    const appEnv = await this.getAppByEnvironmentIndex(environment, index)
    const appKey = this.getAppKey(environment, index)
    return {
      appEnv,
      appKey,
    }
  }

  getAppByEnvironmentIndex(environment: string, index: number): Promise<AppEnvironment> {
    const appKey = this.getAppKey(environment, index)
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

  getAppKey(environment: string, index: number): string {
    return `app-${index}-${environment}`
  }

  async getSolanaConnection(environment: string, index: number): Promise<Solana> {
    const appKey = this.getAppKey(environment, index)
    if (!this.connections.has(appKey)) {
      const env = await this.getAppByEnvironmentIndex(environment, index)
      this.connections.set(
        appKey,
        new Solana(env.cluster.endpointPrivate, {
          logger: new Logger(`@kin-kinetic/solana:${appKey}`),
        }),
      )
    }
    return this.connections.get(appKey)
  }

  getUserByEmail(email: string) {
    return this.user.findFirst({ where: { emails: { some: { email } } }, include: { emails: true } })
  }

  getUserById(userId: string) {
    return this.user.findUnique({ where: { id: userId }, include: { emails: true } })
  }

  getUserByUsername(username: string) {
    return this.user.findUnique({ where: { username }, include: { emails: true } })
  }

  async configureDefaultData() {
    await this.configureDefaultUsers()
    await this.configureDefaultClusters()
    await this.configureDefaultMints()
  }

  private async configureDefaultUsers() {
    const users = [
      {
        role: UserRole.Admin,
        avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/aliceal.svg',
        id: 'alice',
        name: 'Alice',
        username: this.config.adminUsername,
        password: this.config.adminPassword,
      },
      {
        role: UserRole.User,
        avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/bob42.svg',
        id: 'bob',
        name: 'Bob',
        username: 'bob',
        password: this.config.adminPassword.replace('alice', 'bob'),
      },
      {
        role: UserRole.User,
        avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/charlie42222.svg',
        id: 'charlie',
        name: 'Charlie',
        username: 'charlie',
        password: this.config.adminPassword.replace('alice', 'charlie'),
      },
      {
        role: UserRole.User,
        avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/dave42.svg',
        id: 'dave',
        name: 'Dave',
        username: 'dave',
        password: this.config.adminPassword.replace('alice', 'dave'),
      },
    ]
    for (const user of users) {
      await this.configureDefaultUser(user)
    }
  }

  private async configureDefaultUser({
    id,
    avatarUrl,
    name,
    username,
    password,
    role,
  }: {
    id: string
    avatarUrl: string
    name: string
    username: string
    password: string
    role: UserRole
  }) {
    const existing = await this.user.count({ where: { id } })
    if (existing < 1) {
      const email = `${username}@example.com`
      await this.user.create({
        data: {
          id,
          avatarUrl,
          name,
          password: hashPassword(password),
          role,
          username: id,
          emails: {
            create: { email },
          },
        },
      })
      this.logger.verbose(`Created new ${role} with username ${username} and password ${password}`)
      return
    }
    this.logger.verbose(`Log in as ${role} with username ${username} and password ${password}`)
  }

  private async configureDefaultClusters() {
    return Promise.all(
      this.config.clusters
        .filter((cluster) => !!cluster)
        .map((cluster) =>
          this.cluster
            .upsert({
              where: { id: cluster.id },
              update: { ...omit(cluster, 'status') },
              create: { ...cluster },
            })
            .then((res) => this.logger.verbose(`Configured cluster ${res.name} (${res.status})`)),
        ),
    )
  }

  private async configureDefaultMints() {
    return Promise.all(
      this.config.mints.map((mint) =>
        this.mint
          .upsert({
            where: { id: mint.id },
            update: { ...mint },
            create: { ...mint },
            include: { cluster: true },
          })
          .then((res) => {
            if (res.airdropSecretKey) {
              this.airdropConfig.set(mint.id, {
                airdropAmount: mint.airdropAmount || this.config.defaultMintAirdropAmount,
                airdropMax: mint.airdropMax || this.config.defaultMintAirdropMax,
                decimals: mint.decimals,
                feePayer: Keypair.fromByteArray(JSON.parse(res.airdropSecretKey)).solana,
                mint: getPublicKey(mint.address),
              })
            }
            this.logger.verbose(
              `Configured mint ${res.name} (${res.decimals} decimals) on ${res.cluster?.name} ${
                this.airdropConfig.has(mint.id)
                  ? `(Airdrop ${this.airdropConfig.get(mint.id).feePayer.publicKey?.toBase58()})`
                  : ''
              }`,
            )
          }),
      ),
    )
  }
}
