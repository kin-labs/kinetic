import { AppTransaction, AppTransactionStatus, parseError } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Commitment, parseAndSignTransaction, PublicKeyString } from '@mogami/solana'
import { Injectable } from '@nestjs/common'
import { CreateAccountRequest } from './dto/create-account-request.dto'

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

  async createAccount(input: CreateAccountRequest): Promise<AppTransaction> {
    const app = await this.data.getAppByIndex(Number(input.index))
    const created = await this.data.appTransaction.create({ data: { appId: app.id }, include: { errors: true } })
    const signer = Keypair.fromSecretKey(app.wallets[0].secretKey)

    const { feePayer, source, transaction } = parseAndSignTransaction({ tx: input.tx, signer: signer.solana })
    let errors

    let status: AppTransactionStatus
    let signature: string

    const solanaStart = new Date()

    try {
      signature = await this.data.solana.sendRawTransaction(transaction)
      status = AppTransactionStatus.Committed
    } catch (error) {
      status = AppTransactionStatus.Failed
      errors = parseError(error)
    }

    return this.data.appTransaction.update({
      where: { id: created.id },
      data: {
        errors,
        feePayer,
        mint: this.data.config.mogamiMintPublicKey,
        signature,
        solanaStart,
        solanaCommitted: new Date(),
        source,
        status,
      },
      include: { errors: true },
    })
  }
}
