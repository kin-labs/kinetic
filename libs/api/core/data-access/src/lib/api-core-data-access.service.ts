import { AppCreateInput, AppUserRole } from '@mogami/api/app/data-access'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Solana } from '@mogami/solana'
import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient, UserRole } from '@prisma/client'

@Injectable()
export class ApiCoreDataAccessService extends PrismaClient implements OnModuleInit {
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

  getAppByIndex(index: number) {
    return this.app.findUnique({ where: { index } })
  }

  getDefaultHostname(index: number) {
    return `${index}.${this.config.mogamiDomain}`
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
}
