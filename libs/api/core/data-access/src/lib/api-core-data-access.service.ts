import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Solana } from '@mogami/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ClusterStatus, PrismaClient, UserRole } from '@prisma/client'
import { omit } from 'lodash'

@Injectable()
export class ApiCoreDataAccessService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataAccessService.name)
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

  getAppByIndex(index: number) {
    return this.app.findUnique({
      where: { index },
      include: {
        envs: {
          include: {
            cluster: true,
            mints: {
              include: {
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
