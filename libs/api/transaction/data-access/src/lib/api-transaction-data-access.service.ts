import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { PublicKeyString } from '@mogami/solana'
import { Injectable } from '@nestjs/common'
import { SubmitPaymentRequest } from './dto/submit-payment-request.dto'
import { HistoryResponse } from './entities/history.entity'
import { MinimumKinVersionResponse } from './entities/minimum-kin-version.entity'
import { RecentBlockhashResponse } from './entities/recent-blockhash.entity'
import { ServiceConfigResponse } from './entities/service-config.entity'
import { SignTransactionResponse } from './entities/sign-transaction.entity'
import { SubmitTransactionResponse } from './entities/submit-transaction.entity'
import * as borsh from 'borsh'
import { Transaction } from '@solana/web3.js'

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

  async submitTransaction(body: SubmitPaymentRequest): Promise<boolean> {
    const txJson = JSON.parse(body.tx)
    const schema = new Map([
      [
        Object,
        {
          kind: 'struct',
          fields: [['data', [341]]],
        },
      ],
    ])

    const buffer = borsh.serialize(schema, txJson)
    const tx = Transaction.from(buffer)
    tx.partialSign(...[this.data.config.mogamiSubsidizerKeypair])
    await this.data.solana.submitTransaction(tx)
    return true
  }
}
