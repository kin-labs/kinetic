import { Airdrop, AirdropConfig } from '@mogami/airdrop'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { RequestAirdropRequest } from './dto/request-airdrop-request.dto'
import { AirdropStatsCounts } from './entity/airdrop-stats-counts.entity'
import { AirdropStatsDate } from './entity/airdrop-stats-date.entity'
import { AirdropStats } from './entity/airdrop-stats.entity'
import { RequestAirdropResponse } from './entity/request-airdrop-response.entity'

@Injectable()
export class ApiAirdropDataAccessService {
  private readonly airdrop: Airdrop
  private readonly airdropConfig: AirdropConfig
  private readonly logger = new Logger(ApiAirdropDataAccessService.name)

  constructor(private readonly data: ApiCoreDataAccessService) {
    this.airdropConfig = this.data.config.mogamiAirdropConfig(this.data.solana.connection)
    if (this.airdropConfig) {
      this.airdrop = new Airdrop(this.airdropConfig)
      this.logger.verbose(`Airdrop account ${this.airdropConfig.feePayer.publicKey.toBase58()}`)
    } else {
      this.logger.verbose(`Airdrop disabled.`)
    }
  }

  async requestAirdrop(request: RequestAirdropRequest): Promise<RequestAirdropResponse> {
    if (!this.airdropConfig) {
      throw new BadRequestException(`Airdrop is disabled.`)
    }
    try {
      const result = await this.airdrop.airdrop(
        request.account,
        request.amount ? request.amount : this.data.config.mogamiAirdropDefault,
      )
      await this.data.airdrop.create({
        data: {
          amount: result.amount,
          date: new Date().toISOString().split('T')[0],
          fromOwner: result.balances.from.owner?.toString(),
          fromPreSol: result.balances.from.pre.sol?.toString(),
          fromPreToken: result.balances.from.pre.token?.toString(),
          fromPostSol: result.balances.from.post.sol?.toString(),
          fromPostToken: result.balances.from.post.token?.toString(),
          fromTokenAccount: result.balances.from.tokenAccount,
          mintId: result.config.mint,
          signature: result.signature,
          toOwner: result.balances.to.owner?.toString(),
          toPreSol: result.balances.to.pre.sol?.toString(),
          toPreToken: result.balances.to.pre.token?.toString(),
          toPostSol: result.balances.to.post.sol?.toString(),
          toPostToken: result.balances.to.post.token?.toString(),
          toTokenAccount: result.balances.to.tokenAccount,
        },
      })
      return {
        signature: result.signature,
      }
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error)
    }
  }

  async stats(): Promise<AirdropStats> {
    const [counts, dates] = await Promise.all([this.statsCounts(), this.statsDates()])
    return {
      counts,
      dates,
    }
  }

  private async statsCounts(): Promise<AirdropStatsCounts> {
    const {
      _avg: { amount: averageValue },
      _count: { id: total },
      _sum: { amount: totalValue },
    } = await this.data.airdrop.aggregate({
      _avg: { amount: true },
      _count: { id: true },
      _sum: { amount: true },
    })
    return {
      averageValue,
      total,
      totalValue,
    }
  }
  private async statsDates(): Promise<AirdropStatsDate[]> {
    const dates = await this.data.airdrop.groupBy({
      by: ['date'],
      _count: {
        _all: true,
      },
    })
    return dates.map(({ _count: { _all: count }, date }) => ({
      date,
      count,
    }))
  }
}
