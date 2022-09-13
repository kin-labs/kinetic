import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Solana } from '@kin-kinetic/solana'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class ApiClusterStatDataAccessService {
  solana = new Map<string, Solana>()
  constructor(readonly data: ApiCoreDataAccessService) {}

  @Cron('55 * * * * *')
  async handleCron() {
    const activeClusters = await this.data.getActiveClusters()
    for (const { id, endpointPublic } of activeClusters.filter((item) => item.enableStats)) {
      if (!this.solana.has(id)) {
        const logger = new Logger(`@kin-kinetic/solana:cluster-${id}`)
        this.solana.set(id, new Solana(endpointPublic, { logger: { log: logger.verbose, error: logger.error } }))
      }
      const performanceSamples = await this.solana.get(id).getRecentPerformanceSamples(10)
      if (performanceSamples?.length) {
        await this.data.clusterStat.createMany({
          data: [...performanceSamples.map((sample) => ({ ...sample, clusterId: id }))],
          skipDuplicates: true,
        })
      }
    }
  }

  clusterStats(clusterId: string) {
    return this.data.clusterStat.findMany({ where: { clusterId }, take: 100, orderBy: { slot: 'desc' } })
  }
}
