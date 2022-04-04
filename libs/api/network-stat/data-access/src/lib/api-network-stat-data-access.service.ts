import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Cron } from '@nestjs/schedule'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiNetworkStatDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService) {}

  @Cron('55 * * * * *')
  async handleCron() {
    if (this.data.config.environment === 'production') {
      const performaceSamples = await this.data.solana.getRecentPerformanceSamples(10)
      if (performaceSamples?.length) {
        this.data.networkStat.createMany({
          data: performaceSamples,
          skipDuplicates: true,
        })
      }
    }
  }

  networkStat(networkStatId: string) {
    return this.data.networkStat.findUnique({ where: { id: networkStatId } })
  }

  networkStats() {
    return this.data.networkStat.findMany()
  }
}
