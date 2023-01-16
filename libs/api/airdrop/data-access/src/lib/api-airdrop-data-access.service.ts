import { Airdrop } from '@kin-kinetic/api/airdrop/util'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { ApiKineticService } from '@kin-kinetic/api/kinetic/data-access'
import { Commitment } from '@kin-kinetic/solana'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { RequestAirdropRequest } from './dto/request-airdrop-request.dto'
import { RequestAirdropResponse } from './entity/request-airdrop-response.entity'

@Injectable()
export class ApiAirdropDataAccessService {
  private readonly airdrop = new Map<string, Airdrop>()
  private readonly logger = new Logger(ApiAirdropDataAccessService.name)

  constructor(private readonly data: ApiCoreDataAccessService, private readonly kinetic: ApiKineticService) {}

  async requestAirdrop(input: RequestAirdropRequest): Promise<RequestAirdropResponse> {
    const appKey = getAppKey(input.environment, input.index)
    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
    const solana = await this.kinetic.getSolanaConnection(appKey)

    // Make sure the requested mint is enabled for this app
    const appMint = appEnv.mints.find((mint) => mint.mint.address === input.mint)
    if (!appMint) {
      throw new BadRequestException(`Can't find mint ${input.mint} in app ${appKey}`)
    }
    const mint = appMint.mint

    // Make sure there is an airdrop config for this mint
    const airdropConfig = this.data.getAirdropConfig(mint, appEnv.cluster)
    if (!airdropConfig) {
      throw new BadRequestException(`Airdrop configuration not found.`)
    }

    // Make sure there is an Airdrop configured with a Solana connection
    if (!this.airdrop.get(mint.id)) {
      this.logger.verbose(`Creating airdrop for ${mint.symbol} (${mint.address}) in app ${appKey}`)
      this.airdrop.set(
        mint.id,
        new Airdrop({
          ...airdropConfig,
          connection: solana.connection,
        }),
      )
    }

    try {
      const commitment = input.commitment || Commitment.Confirmed
      const account = input.account
      const amount = input.amount ? input.amount : 1
      this.logger.verbose(`Requesting airdrop: ${account} ${amount} ${mint.symbol} (${mint.address}) in app ${appKey}`)
      const result = await this.airdrop.get(mint.id).airdrop(account, amount, commitment)

      return {
        signature: result.signature,
      }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
