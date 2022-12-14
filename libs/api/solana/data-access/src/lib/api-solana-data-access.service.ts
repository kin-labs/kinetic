import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Solana } from '@kin-kinetic/solana'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ApiSolanaDataAccessService {
  private readonly connections = new Map<string, Solana>()
  private readonly loggers = new Map<string, Logger>()
  constructor(private readonly data: ApiCoreDataAccessService) {}

  deleteConnection(appKey: string): void {
    this.connections.delete(appKey)
    this.getLogger(appKey).log(`Deleted cached connection for ${appKey}`)
  }

  async getConnection(appKey: string): Promise<Solana> {
    if (!this.connections.has(appKey)) {
      const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
      this.connections.set(appKey, new Solana(appEnv.cluster.endpointPrivate, { logger: this.getLogger(appKey) }))
      this.getLogger(appKey).log(`Created new connection for ${appKey}`)
    }
    return this.connections.get(appKey)
  }

  private getLogger(appKey: string) {
    if (!this.loggers.has(appKey)) {
      this.loggers.set(appKey, new Logger(`${ApiSolanaDataAccessService.name}:${appKey}`))
    }
    return this.loggers.get(appKey)
  }
}
