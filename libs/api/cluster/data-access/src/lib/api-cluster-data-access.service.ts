import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { ClusterType } from '@prisma/client'
import { TokenListProvider } from '@solana/spl-token-registry'
import { ClusterToken } from './entity/cluster-token.entity'

@Injectable()
export class ApiClusterDataAccessService {
  readonly tokens = new Map<ClusterType, ClusterToken[]>()
  constructor(private readonly data: ApiCoreDataAccessService) {
    this.configureTokenLists()
  }

  private configureTokenLists() {
    new TokenListProvider().resolve().then((tokens) => {
      this.tokens.set(ClusterType.SolanaDevnet, tokens.filterByClusterSlug('devnet').getList())
      this.tokens.set(ClusterType.SolanaMainnet, tokens.filterByClusterSlug('mainnet-beta').getList())
    })
  }
}
