import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { PublicKeyString } from '@mogami/solana'
import { Injectable } from '@nestjs/common'
import { Commitment, Transaction } from '@solana/web3.js'
import { CreateAccountRequest } from './dto/create-account-request.dto'
import * as borsh from 'borsh'

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

  async createAccount(body: CreateAccountRequest) {
    const txJson = JSON.parse(body.tx)
    const schema = new Map([
      [
        Object,
        {
          kind: 'struct',
          fields: [['data', [432]]],
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
