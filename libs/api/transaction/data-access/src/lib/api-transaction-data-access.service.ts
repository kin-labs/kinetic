import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Injectable } from '@nestjs/common'
import { Transaction } from '@solana/web3.js'
import * as borsh from 'borsh'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { MakeTransferResponse } from './entities/make-transfer-response.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'

@Injectable()
export class ApiTransactionDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService) {}

  getLatestBlockhash(): Promise<LatestBlockhashResponse> {
    return this.data.solana.getLatestBlockhash()
  }

  async getMinimumRentExemptionBalance({
    dataLength,
  }: MinimumRentExemptionBalanceRequest): Promise<MinimumRentExemptionBalanceResponse> {
    const lamports = await this.data.solana.getMinimumBalanceForRentExemption(dataLength)

    return { lamports } as MinimumRentExemptionBalanceResponse
  }

  async makeTransfer(input: MakeTransferRequest): Promise<MakeTransferResponse> {
    const app = await this.data.getAppByIndex(input.index)
    const keyPair = Keypair.fromSecretKey(app.wallet.secretKey)
    const txJson = JSON.parse(input.tx)
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
    tx.partialSign(...[keyPair.solana])
    const signature = await this.data.solana.sendRawTransaction(tx)

    return { signature }
  }
}
