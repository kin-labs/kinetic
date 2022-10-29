import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiClusterUserDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userClusters() {
    return this.data.cluster.findMany({
      include: { mints: { orderBy: { order: 'asc' } } },
      orderBy: { name: 'asc' },
    })
  }

  async userCluster(userId: string, clusterId: string) {
    return this.data.cluster.findUnique({ where: { id: clusterId }, include: { mints: { orderBy: { order: 'asc' } } } })
  }
}
