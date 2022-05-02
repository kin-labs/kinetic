import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { PublicKeyString } from '@mogami/solana'
import { Injectable } from '@nestjs/common'
import { Commitment, Transaction } from '@solana/web3.js'
import * as borsh from 'borsh'
import { CreateAccountRequest } from './dto/create-account-request.dto'
import { CreateAccountResponse } from './entities/create-account.entity'

@Injectable()
export class ApiAccountDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService) {}

  getAccountInfo(accountId: PublicKeyString, commitment?: Commitment) {
    return this.data.solana.getAccountInfo(accountId, { commitment })
  }

  async getBalance(accountId: PublicKeyString) {
    const value = await this.data.solana.getBalance(accountId, this.data.config.mogamiMintPublicKey)
    return { value }
  }

  getHistory(accountId: PublicKeyString) {
    return this.data.solana.getTokenHistory(accountId, this.data.config.mogamiMintPublicKey)
  }

  getTokenAccounts(accountId: PublicKeyString) {
    return this.data.solana.getTokenAccounts(accountId, this.data.config.mogamiMintPublicKey)
  }

  async createAccount(input: CreateAccountRequest): Promise<CreateAccountResponse> {
    const app = await this.data.getAppByIndex(input.index)
    const keyPair = Keypair.fromSecretKey(app.wallet.secretKey)
    const schema = new Map([
      [
        Object,
        {
          kind: 'struct',
          fields: [['data', [432]]],
        },
      ],
    ])

    const buffer = borsh.serialize(schema, input.tx)
    const tx = Transaction.from(buffer)
    tx.partialSign(...[keyPair.solana])
    const signature = await this.data.solana.sendRawTransaction(tx)
    return { signature }
  }
}
