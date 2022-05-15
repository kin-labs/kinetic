import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ClusterType, MintType, Prisma } from '@prisma/client'
import { TokenListProvider } from '@solana/spl-token-registry'
import { ClusterCreateInput } from './dto/cluster-create.input'
import { ClusterTokenInput } from './dto/cluster-token.input'
import { ClusterUpdateInput } from './dto/cluster-update.input'
import { MintAddInput } from './dto/mint-add.input'
import { ClusterStatus } from './entity/cluster-status.enum'
import { ClusterToken } from './entity/cluster-token.entity'

@Injectable()
export class ApiClusterDataAccessService {
  readonly tokens = new Map<ClusterType, ClusterToken[]>()
  constructor(private readonly data: ApiCoreDataAccessService) {
    this.configureTokenLists()
  }

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

  clusterTokens(input: ClusterTokenInput): ClusterToken[] {
    let tokens = this.tokens.get(input.type)
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

  updateCluster(id: string, data: ClusterUpdateInput) {
    return this.data.cluster.update({ where: { id }, data })
  }

  private configureTokenLists() {
    new TokenListProvider().resolve().then((tokens) => {
      this.tokens.set(ClusterType.SolanaDevnet, tokens.filterByClusterSlug('devnet').getList())
      this.tokens.set(ClusterType.SolanaMainnet, tokens.filterByClusterSlug('mainnet-beta').getList())
    })
  }

  async addClusterMint(input: MintAddInput) {
    const cluster = await this.cluster(input.clusterId)
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
    return this.tokens.get(type).find(
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
