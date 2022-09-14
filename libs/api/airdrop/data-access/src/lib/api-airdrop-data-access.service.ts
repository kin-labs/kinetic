import { Airdrop } from '@kin-kinetic/api/airdrop/util'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Commitment } from '@kin-kinetic/solana'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { RequestAirdropRequest } from './dto/request-airdrop-request.dto'
import { RequestAirdropResponse } from './entity/request-airdrop-response.entity'

@Injectable()
export class ApiAirdropDataAccessService {
  private readonly airdrop = new Map<string, Airdrop>()
  private readonly logger = new Logger(ApiAirdropDataAccessService.name)

  constructor(private readonly data: ApiCoreDataAccessService) {}

  async requestAirdrop(request: RequestAirdropRequest): Promise<RequestAirdropResponse> {
    const { environment, index } = request
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.data.getAppByEnvironmentIndex(environment, index)

    // Make sure the requested mint is enabled for this app
    const appMint = appEnv.mints.find((mint) => mint.mint.address === request.mint)
    if (!appMint) {
      throw new Error(`Can't find mint ${request.mint} in environment ${environment} for index ${index}`)
    }
    const mint = appMint.mint

    // Make sure there is an airdrop config for this mint
    const airdropConfig = this.data.airdropConfig.get(mint.id)
    if (!airdropConfig) {
      throw new HttpException(`Airdrop configuration not found.`, HttpStatus.BAD_REQUEST)
    }

    // Make sure there is an Airdrop configured with a Solana connection
    if (!this.airdrop.get(mint.id)) {
      this.logger.verbose(`Creating airdrop for ${mint.symbol} (${mint.address}) on ${environment}`)
      this.airdrop.set(
        mint.id,
        new Airdrop({
          ...airdropConfig,
          connection: solana.connection,
        }),
      )
    }

    try {
      const commitment = request.commitment || Commitment.Finalized
      const account = request.account
      const amount = request.amount ? request.amount : 1
      this.logger.verbose(`Requesting airdrop: ${account} ${amount} ${mint.symbol} (${mint.address}) on ${environment}`)
      const result = await this.airdrop.get(mint.id).airdrop(account, amount, commitment)

      return {
        signature: result.signature,
      }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
    }
  }
}
