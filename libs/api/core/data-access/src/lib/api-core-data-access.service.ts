import { AppConfig } from '@mogami/api/app/data-access'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Solana } from '@mogami/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ClusterStatus, PrismaClient, UserRole } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
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
    await this.configureClusters()
    await this.configureMints()
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

  async getAppConfig(environment: string, index: number): Promise<AppConfig> {
    const env = await this.getAppByEnvironmentIndex(environment, index)

    const mints = env.mints?.map(({ mint, wallet }) => ({
      feePayer: wallet.publicKey,
      logoUrl: mint?.logoUrl,
      programId: TOKEN_PROGRAM_ID.toBase58(),
      publicKey: mint?.address,
      symbol: mint?.symbol,
    }))

    if (!mints.length) {
      throw new Error(`No mints found for environment ${environment}, index ${index}`)
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
