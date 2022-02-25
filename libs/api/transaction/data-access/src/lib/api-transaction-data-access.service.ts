import { Injectable } from '@nestjs/common'
import { HistoryResponse } from './entities/history.entity'
import { MinimumBalanceForRentExemptionResponse } from './entities/minimum-balance-for-rent-exemtion.entity'
import { MinimumKinVersionResponse } from './entities/minimum-kin-version.entity'
import { RecentBlockhashResponse } from './entities/recent-blockhash.entity'
import { ServiceConfigResponse } from './entities/service-config.entity'
import { SignTransactionResponse } from './entities/sign-transaction.entity'
import { SubmitTransactionResponse } from './entities/submit-transaction.entity'

@Injectable()
export class ApiTransactionDataAccessService {
  getServiceConfig(): ServiceConfigResponse {
    return {}
  }

  getMinimumKinVersion(): MinimumKinVersionResponse {
    return {
      version: 1,
    }
  }

  getRecentBlockhash(): RecentBlockhashResponse {
    return {}
  }

  getMinimumBalanceForRentExemption(size: number): MinimumBalanceForRentExemptionResponse {
    return {
      lamports: 0,
    }
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
