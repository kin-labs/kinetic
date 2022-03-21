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

  getBalance(accountId: PublicKeyString) {
    return this.data.solana.getBalance(accountId, this.data.config.mogamiMintPublicKey)
  }

  getHistory(accountId: PublicKeyString) {
    return this.data.solana.getTokenHistory(accountId, this.data.config.mogamiMintPublicKey)
  }

  getTokenAccounts(accountId: PublicKeyString) {
    return this.data.solana.getTokenAccounts(accountId, this.data.config.mogamiMintPublicKey)
  }

  createAccount(body: CreateAccountRequest) {
    console.log('body', body)
    const txJson = JSON.parse(body.tx)
    console.log('body', txJson)

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

    console.log('buffer', buffer)
    const tx = Transaction.from(buffer)
    console.log('tx', tx)

    console.log('tx.feePayer', tx.feePayer.toBase58())
    return true
  }
}
