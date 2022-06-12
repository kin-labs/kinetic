import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ClusterType, MintType, Prisma } from '@prisma/client'
import { ApiClusterDataAccessService } from './api-cluster-data-access.service'
import { ClusterCreateInput } from './dto/cluster-create.input'
import { ClusterTokenInput } from './dto/cluster-token.input'
import { ClusterUpdateInput } from './dto/cluster-update.input'
import { MintAddInput } from './dto/mint-add.input'
import { ClusterStatus } from './entity/cluster-status.enum'
import { ClusterToken } from './entity/cluster-token.entity'

@Injectable()
export class ApiClusterAdminDataAccessService {
  constructor(private readonly cluster: ApiClusterDataAccessService, private readonly data: ApiCoreDataAccessService) {}

  async adminCreateCluster(userId: string, data: ClusterCreateInput) {
    await this.data.ensureAdminUser(userId)
    return this.data.cluster.create({ data })
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
    return this.data.cluster.findUnique({ where: { id: clusterId }, include: { mints: true } })
  }

  async adminClusterTokens(userId: string, input: ClusterTokenInput): Promise<ClusterToken[]> {
    await this.data.ensureAdminUser(userId)
    let tokens = this.cluster.tokens.get(input.type)
    if (input.address) {
      tokens = tokens.filter((item) => item.address === input.address)
    }
    if (input.symbol) {
      tokens = tokens.filter((item) => item.symbol?.toLowerCase() === input.symbol?.toLowerCase())
    }
    if (input.name) {
      tokens = tokens.filter((item) => item.name?.toLowerCase()?.includes(input.name?.toLowerCase()))
    }
    return (tokens || []).slice(0, 100)
  }

  async adminUpdateCluster(userId: string, clusterId: string, data: ClusterUpdateInput) {
    await this.data.ensureAdminUser(userId)
    return this.data.cluster.update({ where: { id: clusterId }, data })
  }

  async addClusterMint(userId: string, input: MintAddInput) {
    const cluster = await this.adminCluster(userId, input.clusterId)
    if (!cluster) {
      throw new BadRequestException('Cluster not found')
    }

    if (cluster.status !== ClusterStatus.Active) {
      throw new BadRequestException('Cluster must be active to add Mints')
    }

    const token = this.getClusterToken(cluster.type, input)
    if (!token) {
      throw new BadRequestException('No such token found')
    }

    const mint: Prisma.MintUncheckedCreateWithoutClusterInput = {
      address: token.address,
      coingeckoId: token.extensions.coingeckoId,
      decimals: token.decimals,
      logoUrl: token.logoURI,
      name: token.name,
      symbol: token.symbol,
      type: MintType.SplToken,
    }

    return this.data.cluster.update({
      data: { mints: { create: mint } },
      where: { id: cluster.id },
      include: { mints: true },
    })
  }

  private getClusterToken(type: ClusterType, { address, name, symbol }: MintAddInput) {
    return this.cluster.tokens.get(type).find(
      (token) =>
        // Match address
        token?.address === address &&
        // Match name
        token?.name === name &&
        // Match symbol
        token?.symbol === symbol,
    )
  }
}
