import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { ClusterCreateInput } from './dto/cluster-create.input'
import { ClusterUpdateInput } from './dto/cluster-update.input'

@Injectable()
export class ApiClusterDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  createCluster(data: ClusterCreateInput) {
    return this.data.cluster.create({ data })
  }

  deleteCluster(id: string) {
    return this.data.cluster.delete({ where: { id } })
  }

  clusters() {
    return this.data.cluster.findMany({
      include: { mints: true },
      orderBy: { name: 'asc' },
    })
  }

  cluster(id: string) {
    return this.data.cluster.findUnique({ where: { id }, include: { mints: true } })
  }

  updateCluster(id: string, data: ClusterUpdateInput) {
    return this.data.cluster.update({ where: { id }, data })
  }
}
