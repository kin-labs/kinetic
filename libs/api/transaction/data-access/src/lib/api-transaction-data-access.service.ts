import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { HistoryResponse } from './entities/history.entity'
import { MinimumKinVersionResponse } from './entities/minimum-kin-version.entity'
import { RecentBlockhashResponse } from './entities/recent-blockhash.entity'
import { ServiceConfigResponse } from './entities/service-config.entity'
import { SignTransactionResponse } from './entities/sign-transaction.entity'
import { SubmitTransactionResponse } from './entities/submit-transaction.entity'

@Injectable()
export class ApiTransactionDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService) {}

  getServiceConfig(): ServiceConfigResponse {
    return this.data.config.getServiceConfig()
  }

  getMinimumKinVersion(): MinimumKinVersionResponse {
    return { version: 5 }
  }

  getRecentBlockhash(): Promise<RecentBlockhashResponse> {
    return this.data.solana.getRecentBlockhash()
  }

  getMinimumBalanceForRentExemption(dataLength: number): Promise<number> {
    return this.data.solana.getMinimumBalanceForRentExemption(dataLength)
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
