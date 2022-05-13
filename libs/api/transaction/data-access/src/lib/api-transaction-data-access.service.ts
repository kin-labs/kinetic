import { ApiAppWebhookDataAccessService, AppWebhookType } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Injectable } from '@nestjs/common'
import { App, AppTransactionStatus, Prisma } from '@prisma/client'
import { decodeTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction } from '@solana/web3.js'
import * as borsh from 'borsh'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { MakeTransferResponse } from './entities/make-transfer-response.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'

@Injectable()
export class ApiTransactionDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService, private readonly appWebhook: ApiAppWebhookDataAccessService) {}

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
    const created = await this.data.appTransaction.create({ data: { appId: app.id } })
    const keyPair = Keypair.fromSecretKey(app.wallet.secretKey)
    const txJson = JSON.parse(input.tx)
    const schema = new Map([
      [
        Object,
        {
          kind: 'struct',
          fields: [['data', [420]]],
        },
      ],
    ])

    const errors: string[] = []
    const buffer = borsh.serialize(schema, txJson)
    const tx = Transaction.from(buffer)
    tx.partialSign(...[keyPair.solana])
    const feePayer = tx.feePayer.toBase58()
    let status: AppTransactionStatus
    let signature

    const decodedInstruction = decodeTransferInstruction(tx.instructions[1], TOKEN_PROGRAM_ID)
    const { source, destination } = decodedInstruction.keys
    const amount = Number(decodedInstruction.data.amount)

    const appTransaction: Prisma.AppTransactionUpdateInput = {
      amount,
      destination: destination.pubkey.toBase58(),
      errors: [],
      feePayer,
      mint: this.data.config.mogamiMintPublicKey,
      source: source.pubkey.toBase58(),
    }

    // Send Verify Webhook
    if (app.webhookVerifyEnabled && app.webhookVerifyUrl) {
      appTransaction.webhookVerifyStart = new Date()
      try {
        await this.sendVerifyWebhook(app, appTransaction)
        appTransaction.webhookVerifyEnd = new Date()
      } catch (err) {
        appTransaction.webhookVerifyEnd = new Date()
        return this.updateAppTransaction(created.id, {
          status: AppTransactionStatus.Failed,
          ...appTransaction,
          errors: [app.webhookVerifyUrl, err.toString()],
        })
      }
    }

    // Solana Transaction
    appTransaction.solanaStart = new Date()
    try {
      appTransaction.signature = await this.data.solana.sendRawTransaction(tx)
      appTransaction.status = AppTransactionStatus.Succeed
    } catch (error) {
      appTransaction.errors = [error.toString()]
      appTransaction.status = AppTransactionStatus.Failed
    }

    // Send Event Webhook
    if (app.webhookEventEnabled && app.webhookEventUrl) {
      appTransaction.webhookEventStart = new Date()
      const updated = await this.updateAppTransaction(created.id, {
        ...appTransaction,
      })

      try {
        await this.sendEventWebhook(app, updated)
        appTransaction.webhookEventEnd = new Date()
      } catch (err) {
        appTransaction.webhookEventEnd = new Date()
        return this.updateAppTransaction(created.id, {
          status: AppTransactionStatus.Failed,
          errors: [app.webhookVerifyUrl, err.toString()],
          ...appTransaction,
        })
      }
    }

    // Return object
    return this.updateAppTransaction(created.id, { ...appTransaction })
  }

  updateAppTransaction(id: string, data: Prisma.AppTransactionUpdateInput) {
    return this.data.appTransaction.update({
      where: { id },
      data: { ...data },
    })
  }

  sendEventWebhook(app: App, payload: Prisma.AppTransactionUpdateInput) {
    return this.appWebhook.sendWebhook(app, { type: AppWebhookType.Event, payload })
  }

  sendVerifyWebhook(app: App, payload: Prisma.AppTransactionUpdateInput) {
    return this.appWebhook.sendWebhook(app, { type: AppWebhookType.Verify, payload })
  }
}
