import { Injectable } from '@nestjs/common'
import { HistoryResponse } from './entities/history.entity'
import { MinimumKinVersionResponse } from './entities/minimum-kin-version.entity'
import { RecentBlockhashResponse } from './entities/recent-blockhash.entity'
import { ServiceConfigResponse } from './entities/service-config.entity'
import { SignTransactionResponse } from './entities/sign-transaction.entity'
import { SubmitTransactionResponse } from './entities/submit-transaction.entity'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Solana } from '@mogami/solana'

@Injectable()
export class ApiTransactionDataAccessService {
  readonly solana: Solana

  constructor(readonly config: ApiConfigDataAccessService) {
    this.solana = new Solana(this.config.solanaRpcEndpoint)
  }

  getServiceConfig(): ServiceConfigResponse {
    return this.config.getServiceConfig()
  }

  getMinimumKinVersion(): MinimumKinVersionResponse {
    return {
      version: this.config.minimumKinVersion,
    }
  }

  getRecentBlockhash(): Promise<RecentBlockhashResponse> {
    return this.solana.getRecentBlockhash()
  }

  getMinimumBalanceForRentExemption(dataLength: number): Promise<number> {
    return this.solana.getMinimumBalanceForRentExemption(dataLength)
  }

  getHistory(): HistoryResponse {
    return {}
  }

  signTransaction(): SignTransactionResponse {
    return {}
  }

  submitTransaction(): SubmitTransactionResponse {
    return {}
  }
}
