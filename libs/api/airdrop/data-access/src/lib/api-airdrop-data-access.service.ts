import { Airdrop, AirdropConfig } from '@mogami/airdrop'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { AirdropRequest } from './dto/airdrop-request.dto'

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

  async request(request: AirdropRequest) {
    if (!this.airdropConfig) {
      throw new BadRequestException(`Airdrop is disabled.`)
    }
    try {
      const result = await this.airdrop.airdrop(request.account, Number(request.amount))

      return {
        signature: result.signature,
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
