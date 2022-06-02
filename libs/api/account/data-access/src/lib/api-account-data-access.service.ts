import { AppTransaction, AppTransactionStatus, parseError } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Commitment, parseAndSignTransaction, PublicKeyString } from '@mogami/solana'
import { Injectable } from '@nestjs/common'
import { CreateAccountRequest } from './dto/create-account-request.dto'

@Injectable()
export class ApiAccountDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService) {}

  async getAccountInfo(environment: string, index: number, accountId: PublicKeyString, commitment?: Commitment) {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getAccountInfo(accountId, { commitment })
  }

  async getBalance(environment: string, index: number, accountId: PublicKeyString) {
    const solana = await this.data.getSolanaConnection(environment, index)

    const value = await solana.getBalance(accountId, this.data.config.mogamiMintPublicKey)

    return { value }
  }

  async getHistory(environment: string, index: number, accountId: PublicKeyString) {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getTokenHistory(accountId, this.data.config.mogamiMintPublicKey)
  }

  async getTokenAccounts(environment: string, index: number, accountId: PublicKeyString) {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getTokenAccounts(accountId, this.data.config.mogamiMintPublicKey)
  }

  async createAccount(input: CreateAccountRequest): Promise<AppTransaction> {
    const solana = await this.data.getSolanaConnection(input.environment, input.index)
    const appEnv = await this.data.getAppByEnvironmentIndex(input.environment, input.index)
    const app = await this.data.getAppByIndex(Number(input.index))

    const created = await this.data.appTransaction.create({
      data: { appId: app.id, appEnvId: appEnv.id },
      include: { errors: true },
    })
    const mint = appEnv.mints.find(({ mint }) => mint.symbol === input.mint)
    if (!mint) {
      throw new Error(`Can't find mint ${input.mint} in environment ${input.environment} for index ${input.index}`)
    }
    const signer = Keypair.fromSecretKey(mint.wallet?.secretKey)

    const { feePayer, source, transaction } = parseAndSignTransaction({ tx: input.tx, signer: signer.solana })
    let errors

    let status: AppTransactionStatus
    let signature: string

    const solanaStart = new Date()

    try {
      signature = await solana.sendRawTransaction(transaction)
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
