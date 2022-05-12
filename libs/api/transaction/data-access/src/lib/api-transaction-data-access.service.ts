import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Injectable } from '@nestjs/common'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { MakeTransferResponse } from './entities/make-transfer-response.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { AppPaymentStatus } from '@prisma/client'
import { deserializeAndSignTransaction } from '@mogami/solana'

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
    const created = await this.data.appPayment.create({ data: { appId: app.id } })
    const keyPair = Keypair.fromSecretKey(app.wallet.secretKey)

    const errors: string[] = []
    let status: AppPaymentStatus = AppPaymentStatus.Pending
    let signature

    const { amount, destination, feePayer, source, tx } = deserializeAndSignTransaction(keyPair, input.tx, 'transfer')

    const solanaStart = new Date()
    try {
      signature = await this.data.solana.sendRawTransaction(tx)
      status = AppPaymentStatus.Succeed
    } catch (error) {
      status = AppPaymentStatus.Failed
      errors.push(error.toString())
    }

    return this.data.appPayment.update({
      where: { id: created.id },
      data: {
        amount,
        destination: destination.pubkey.toBase58(),
        errors,
        feePayer,
        mint: this.data.config.mogamiMintPublicKey,
        signature,
        solanaStart,
        solanaEnd: new Date(),
        source: source.pubkey.toBase58(),
        status,
      },
    })
  }
}
