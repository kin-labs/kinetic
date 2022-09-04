import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { BadRequestException, Injectable } from '@nestjs/common'
import { MintType, Prisma } from '@prisma/client'
import { AdminClusterCreateInput } from './dto/admin-cluster-create.input'
import { AdminClusterUpdateInput } from './dto/admin-cluster-update.input'
import { AdminMintCreateInput } from './dto/admin-mint-create.input'
import { ClusterStatus } from './entity/cluster-status.enum'

@Injectable()
export class ApiClusterAdminDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCreateCluster(userId: string, data: AdminClusterCreateInput) {
    await this.data.ensureAdminUser(userId)
    return this.data.cluster.create({
      data: {
        ...data,
        explorer: data.explorer || 'https://explorer.solana.com/{path}',
      },
    })
  }

  async adminDeleteCluster(userId: string, clusterId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.cluster.delete({ where: { id: clusterId } })
  }

  async adminClusters(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.cluster.findMany({
      include: { mints: true },
      orderBy: { name: 'asc' },
    })
  }

  async adminCluster(userId: string, clusterId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.cluster.findUnique({ where: { id: clusterId }, include: { mints: { orderBy: { order: 'asc' } } } })
  }

  async adminUpdateCluster(userId: string, clusterId: string, data: AdminClusterUpdateInput) {
    await this.data.ensureAdminUser(userId)
    return this.data.cluster.update({ where: { id: clusterId }, data })
  }

  async adminMintCreate(userId: string, input: AdminMintCreateInput) {
    const cluster = await this.adminCluster(userId, input.clusterId)
    if (!cluster) {
      throw new BadRequestException('Cluster not found')
    }

    if (cluster.status !== ClusterStatus.Active) {
      throw new BadRequestException('Cluster must be active to add Mints')
    }

    // Get the order of the last mint and increase by 1
    const order = cluster.mints[cluster.mints.length - 1].order + 1
    const mint: Prisma.MintUncheckedCreateWithoutClusterInput = {
      address: input.address,
      coinGeckoId: input.coinGeckoId,
      decimals: input.decimals,
      logoUrl: input.logoUrl,
      name: input.name,
      order,
      symbol: input.symbol,
      type: MintType.SplToken,
    }

    return this.data.cluster.update({
      data: { mints: { create: mint } },
      where: { id: cluster.id },
      include: { mints: true },
    })
  }
}
