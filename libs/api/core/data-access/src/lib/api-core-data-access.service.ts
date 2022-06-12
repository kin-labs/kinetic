import { AirdropConfig } from '@mogami/airdrop'
import { hashPassword } from '@mogami/api/auth/util'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Keypair } from '@mogami/keypair'
import { getPublicKey, Solana } from '@mogami/solana'
import { Injectable, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { App, AppUserRole, ClusterStatus, PrismaClient, UserRole } from '@prisma/client'
import { omit } from 'lodash'
import { MetricService } from 'nestjs-otel'

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
    return this.cluster.findMany({ where: { status: ClusterStatus.Active }, include: { mints: true } })
  }

  getAppById(id: string) {
    return this.app.findUnique({
      where: { id },
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
        users: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  getAppByEnvironmentIndex(environment: string, index: number) {
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
        new Solana(env.cluster.endpoint, {
          logger: new Logger(`@mogami/solana:${appKey}`),
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
    await this.configureDefaultUser({
      id: 'admin',
      avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/aliceal.svg',
      name: 'Alice',
      email: this.config.adminEmail,
      password: this.config.adminPassword,
      role: UserRole.Admin,
    })
    await this.configureDefaultUser({
      id: 'bob',
      avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/bob42.svg',
      name: 'Bob',
      email: this.config.adminEmail.replace('admin', 'bob'),
      password: this.config.adminPassword.replace('@dmin', '@bob'),
      role: UserRole.User,
    })
    await this.configureDefaultUser({
      id: 'charlie',
      avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/charlie42222.svg',
      name: 'Charlie',
      email: this.config.adminEmail.replace('admin', 'charlie'),
      password: this.config.adminPassword.replace('@dmin', '@charlie'),
      role: UserRole.User,
    })
    await this.configureDefaultUser({
      id: 'dave',
      avatarUrl: 'https://avatars.dicebear.com/api/open-peeps/dave42.svg',
      name: 'Dave',
      email: this.config.adminEmail.replace('admin', 'dave'),
      password: this.config.adminPassword.replace('@dmin', '@dave'),
      role: UserRole.User,
    })
  }

  private async configureDefaultUser({
    id,
    avatarUrl,
    name,
    email,
    password,
    role,
  }: {
    id: string
    avatarUrl: string
    name: string
    email: string
    password: string
    role: UserRole
  }) {
    const existing = await this.user.count({ where: { id } })
    if (existing < 1) {
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
      this.logger.verbose(`Created new ${role} with email ${email} and password ${password}`)
      return
    }
    this.logger.verbose(`Log in as ${role} with email ${email} and password ${password}`)
  }

  private async configureDefaultClusters() {
    return Promise.all(
      this.config.clusters.map((cluster) =>
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
