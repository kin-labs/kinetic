import { hashPassword } from '@mogami/api/auth/util'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Solana } from '@mogami/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ClusterStatus, PrismaClient, UserRole } from '@prisma/client'
import { omit } from 'lodash'

@Injectable()
export class ApiCoreDataAccessService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataAccessService.name)
  readonly connections = new Map<string, Solana>()
  readonly solana: Solana

  constructor(readonly config: ApiConfigDataAccessService) {
    super()
    this.solana = new Solana(config.solanaRpcEndpoint, {
      logger: new Logger('@mogami/solana'),
    })
  }

  uptime() {
    return process.uptime()
  }

  async onModuleInit() {
    await this.$connect()
  }

  async healthCheck() {
    const isMogamiOk = true
    const isSolanaOk = await this.solana.healthCheck()

    return {
      isSolanaOk,
      isMogamiOk,
      time: new Date(),
    }
  }

  async ensureAdminUser(userId: string) {
    const user = await this.getUserById(userId)
    if (user.role !== UserRole.Admin) {
      throw new Error(`Admin role required.`)
    }
    return user
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
        users: true,
        wallets: true,
      },
    })
  }

  getAppByEnvironmentIndex(environment: string, index: number) {
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
        wallets: true,
      },
    })
  }

  getAppKey(environment: string, index: number): string {
    return `app-${environment}-${index}`
  }

  async getSolanaConnection(environment: string, index: number): Promise<Solana> {
    const key = this.getAppKey(environment, index)
    if (!this.connections.has(key)) {
      const env = await this.getAppByEnvironmentIndex(environment, index)
      this.connections.set(
        key,
        new Solana(env.cluster.endpoint, {
          logger: new Logger(`@mogami/solana: environment: ${environment}, index: ${index}`),
        }),
      )
    }
    return this.connections.get(key)
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
    await this.configureAdminUser()
    await this.configureClusters()
    await this.configureMints()
  }

  private async configureAdminUser() {
    const email = this.config.adminEmail
    const password = this.config.adminPassword
    const existing = await this.user.count({ where: { role: UserRole.Admin } })
    if (existing < 1) {
      await this.user.create({
        data: {
          id: 'admin',
          name: 'Admin',
          password: hashPassword(password),
          role: UserRole.Admin,
          username: 'admin',
          emails: {
            create: { email },
          },
        },
      })
      this.logger.verbose(`Created new Admin with email ${email} and password ${password}`)
      return
    }
    this.logger.verbose(`Log in as Admin with email ${email} and password ${password}`)
  }

  private async configureClusters() {
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

  private async configureMints() {
    return Promise.all(
      this.config.mints.map((mint) =>
        this.mint
          .upsert({
            where: { id: mint.id },
            update: { ...mint },
            create: { ...mint },
            include: { cluster: true },
          })
          .then((res) => this.logger.verbose(`Configured mint ${res.name} on ${res.cluster?.name}`)),
      ),
    )
  }
}
