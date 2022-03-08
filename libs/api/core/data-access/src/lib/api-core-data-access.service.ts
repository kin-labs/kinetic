import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Solana } from '@mogami/solana'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

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
}
