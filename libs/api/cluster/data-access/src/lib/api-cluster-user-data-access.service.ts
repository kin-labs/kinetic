import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiClusterUserDataAccessService {
  constructor(private readonly core: ApiCoreService) {}

  async userClusters() {
    return this.core.cluster.findMany({
      include: { mints: { orderBy: { order: 'asc' } } },
      orderBy: { name: 'asc' },
    })
  }

  async userCluster(userId: string, clusterId: string) {
    return this.core.cluster.findUnique({ where: { id: clusterId }, include: { mints: { orderBy: { order: 'asc' } } } })
  }
}
