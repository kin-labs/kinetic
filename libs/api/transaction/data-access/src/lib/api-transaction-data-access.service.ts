import {
  ApiAppWebhookDataAccessService,
  AppEnv,
  AppTransaction,
  AppWebhookType,
  parseError,
} from '@mogami/api/app/data-access'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Commitment, parseAndSignTokenTransfer } from '@mogami/solana'
import { Injectable, Logger } from '@nestjs/common'
import { AppTransactionErrorType, AppTransactionStatus, Prisma } from '@prisma/client'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'
import { Counter, metrics } from '@opentelemetry/api-metrics'
import { OpenTelementrySdk } from '@mogami/api/core/util'

@Injectable()
export class ApiTransactionDataAccessService {
  private logger = new Logger(ApiTransactionDataAccessService.name)
  private makeTransferCounters = new Map<string, Counter>()

  constructor(readonly data: ApiCoreDataAccessService, private readonly appWebhook: ApiAppWebhookDataAccessService) {
    if (this.data.config.isMetricsEnabled) {
      metrics.setGlobalMeterProvider(OpenTelementrySdk.getMetricProvider())
    }

    this.makeTransferCounters.set(
      'app_make_transfer_call_counter',
      this.data.metricService.getCounter('app_make_transfer_call_counter', {
        description: 'Total number of makeTransfer request calls',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_error_mint_not_found_counter',
      this.data.metricService.getCounter('app_make_transfer_error_mint_not_found_counter', {
        description: 'Total number of makeTransfer mint not found errors',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_webhook_verify_success_counter',
      this.data.metricService.getCounter('app_make_transfer_webhook_verify_success_counter', {
        description: 'Total number of makeTransfer webhook verify success',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_webhook_verify_error_counter',
      this.data.metricService.getCounter('app_make_transfer_webhook_verify_error_counter', {
        description: 'Total number of makeTransfer webhook verify error',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_send_solana_transaction_success_counter',
      this.data.metricService.getCounter('app_make_transfer_send_solana_transaction_success_counter', {
        description: 'Total number of makeTransfer send Solana transaction success',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_send_solana_transaction_error_counter',
      this.data.metricService.getCounter('app_make_transfer_send_solana_transaction_error_counter', {
        description: 'Total number of makeTransfer send Solana transaction error',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_confirmed_solana_transaction_counter',
      this.data.metricService.getCounter('app_make_transfer_confirmed_solana_transaction_counter', {
        description: 'Total number of makeTransfer confirm Solana transaction success',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_webhook_event_success_counter',
      this.data.metricService.getCounter('app_make_transfer_webhook_event_success_counter', {
        description: 'Total number of makeTransfer webhook event success',
      }),
    )

    this.makeTransferCounters.set(
      'app_make_transfer_webhook_event_error_counter',
      this.data.metricService.getCounter('app_make_transfer_webhook_event_error_counter', {
        description: 'Total number of makeTransfer webhook event error',
      }),
    )
  }

  async getLatestBlockhash(environment: string, index: number): Promise<LatestBlockhashResponse> {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getLatestBlockhash()
  }

  async getMinimumRentExemptionBalance(
    environment: string,
    index: number,
    { dataLength }: MinimumRentExemptionBalanceRequest,
  ): Promise<MinimumRentExemptionBalanceResponse> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const lamports = await solana.getMinimumBalanceForRentExemption(dataLength)

    return { lamports } as MinimumRentExemptionBalanceResponse
  }

  async makeTransfer(input: MakeTransferRequest): Promise<AppTransaction> {
    const solana = await this.data.getSolanaConnection(input.environment, input.index)
    const appEnv = await this.data.getAppByEnvironmentIndex(input.environment, input.index)
    this.makeTransferCounters.get('app_make_transfer_call_counter').add(1)

    const appKey = this.data.getAppKey(input.environment, input.index)
    // increment makeTranfer counter for this appKey
    if (!this.makeTransferCounters.has(`app_make_transfer_with_appKey_${appKey}_call_counter`)) {
      this.makeTransferCounters.set(
        `app_make_transfer_with_appKey_${appKey}_call_counter`,
        this.data.metricService.getCounter(`app_make_transfer_with_appKey_${appKey}_call_counter`, {
          description: `Total number of makeTransfer with appKey: ${appKey}`,
        }),
      )
    }
    this.makeTransferCounters.get(`app_make_transfer_with_appKey_${appKey}_call_counter`).add(1)

    const created = await this.data.appTransaction.create({
      data: {
        appEnvId: appEnv.id,
        commitment: input.commitment,
        referenceId: input.referenceId,
        referenceType: input.referenceType,
      },
      include: { errors: true },
    })
    const mint = appEnv.mints.find(({ mint }) => mint.symbol === input.mint)
    if (!mint) {
      // increment makeTranfer error counter - mint
      this.makeTransferCounters.get('app_make_transfer_error_mint_not_found_counter').add(1)
      if (!this.makeTransferCounters.has(`app_make_transfer_with_mint_${mint}_call_counter`)) {
        this.makeTransferCounters.set(
          `app_make_transfer_with_mint_${mint}_call_counter`,
          this.data.metricService.getCounter(`app_make_transfer_with_mint_${mint}_call_counter`, {
            description: `Total number of makeTransfer with mint: ${mint}`,
          }),
        )
      }
      this.makeTransferCounters.get(`app_make_transfer_with_mint_${mint}_call_counter`).add(1)
      throw new Error(`${appKey}: Can't find mint ${input.mint}`)
    }
    const signer = Keypair.fromSecretKey(mint.wallet?.secretKey)

    const { amount, blockhash, destination, feePayer, source, transaction } = parseAndSignTokenTransfer({
      tx: input.tx,
      signer: signer.solana,
    })

    const appTransaction: Prisma.AppTransactionUpdateInput = {
      amount,
      destination: destination.pubkey.toBase58(),
      feePayer,
      mint: mint?.mint?.address,
      source,
    }

    // Send Verify Webhook
    if (appEnv.webhookVerifyEnabled && appEnv.webhookVerifyUrl) {
      appTransaction.webhookVerifyStart = new Date()
      try {
        await this.sendVerifyWebhook(appEnv, appTransaction)
        appTransaction.webhookVerifyEnd = new Date()
        // makeTranfer transfer webhook success count
        this.makeTransferCounters.get('app_make_transfer_webhook_verify_success_counter').add(1)
      } catch (err) {
        appTransaction.webhookVerifyEnd = new Date()
        // makeTranfer transfer webhook error count
        this.makeTransferCounters.get('app_make_transfer_webhook_verify_error_counter').add(1)
        return this.updateAppTransaction(created.id, {
          ...appTransaction,
          status: AppTransactionStatus.Failed,
          errors: {
            create: parseError(err, AppTransactionErrorType.WebhookFailed),
          },
        })
      }
    }

    // Solana Transaction
    appTransaction.solanaStart = new Date()
    try {
      // makeTranfer transfer solana success count
      appTransaction.signature = await solana.sendRawTransaction(transaction)
      appTransaction.status = AppTransactionStatus.Committed
      appTransaction.solanaCommitted = new Date()
      this.logger.verbose(`${appKey}: makeTransfer ${appTransaction.status} ${appTransaction.signature}`)
      this.makeTransferCounters.get('app_make_transfer_send_solana_transaction_success_counter').add(1)
    } catch (error) {
      // makeTranfer transfer solana error count
      appTransaction.errors = { create: parseError(error) }
      appTransaction.status = AppTransactionStatus.Failed
      this.logger.verbose(`${appKey}: makeTransfer ${appTransaction.status} ${error}`)
      appTransaction.solanaCommitted = new Date()
      this.makeTransferCounters.get('app_make_transfer_send_solana_transaction_error_counter').add(1)
    }

    // Confirm transaction
    if (appTransaction.signature) {
      this.logger.verbose(`${appKey}: makeTransfer confirming ${input.commitment} ${appTransaction.signature}...`)
      // Start listening for commitment
      await solana.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight: input.lastValidBlockHeight,
          signature: appTransaction.signature as string,
        },
        input.commitment,
      )
      appTransaction.status = AppTransactionStatus.Confirmed
      appTransaction.solanaConfirmed = new Date()
      await this.updateAppTransaction(created.id, {
        ...appTransaction,
      })
      this.logger.verbose(
        `${appKey}: makeTransfer ${appTransaction.status} ${input.commitment} ${appTransaction.signature}`,
      )

      this.confirmSignature(input.environment, input.index, created.id, {
        blockhash,
        signature: appTransaction.signature as string,
        lastValidBlockHeight: input.lastValidBlockHeight,
      })
      this.makeTransferCounters.get('app_make_transfer_confirmed_solana_transaction_counter').add(1)
    }

    // Send Event Webhook
    let webhookEventEnd
    if (appEnv.webhookEventEnabled && appEnv.webhookEventUrl) {
      const updated = await this.updateAppTransaction(created.id, {
        webhookEventStart: new Date(),
      })

      try {
        await this.sendEventWebhook(appEnv, updated)
        webhookEventEnd = new Date()
        this.makeTransferCounters.get('app_make_transfer_webhook_event_success_counter').add(1)
      } catch (err) {
        webhookEventEnd = new Date()
        this.makeTransferCounters.get('app_make_transfer_webhook_event_success_counter').add(1)
        return this.updateAppTransaction(created.id, {
          webhookEventEnd,
          status: AppTransactionStatus.Failed,
          errors: {
            create: parseError(err, AppTransactionErrorType.WebhookFailed),
          },
        })
      }
    }

    // Return object
    return this.updateAppTransaction(created.id, { webhookEventEnd })
  }

  updateAppTransaction(id: string, data: Prisma.AppTransactionUpdateInput) {
    return this.data.appTransaction.update({
      where: { id },
      data: { ...data },
      include: { errors: true },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendEventWebhook(appEnv: AppEnv, payload: any) {
    return this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Event, payload })
  }

  sendVerifyWebhook(appEnv: AppEnv, payload: Prisma.AppTransactionUpdateInput) {
    return this.appWebhook.sendWebhook(appEnv, { type: AppWebhookType.Verify, payload })
  }

  async confirmSignature(
    environment: string,
    index: number,
    appTransactionId: string,
    {
      blockhash,
      lastValidBlockHeight,
      signature,
    }: {
      blockhash: string
      lastValidBlockHeight: number
      signature: string
    },
  ) {
    const appKey = this.data.getAppKey(environment, index)
    const solana = await this.data.getSolanaConnection(environment, index)
    this.logger.verbose(`${appKey}: confirmSignature: confirming ${signature}`)

    const finalized = await solana.confirmTransaction(
      {
        blockhash,
        lastValidBlockHeight,
        signature: signature as string,
      },
      Commitment.Finalized,
    )
    if (finalized) {
      this.logger.verbose(`${appKey}: confirmSignature: ${Commitment.Finalized} ${signature}`)
      const solanaTransaction = await solana.connection.getParsedTransaction(signature, 'finalized')
      await this.data.appTransaction.update({
        where: { id: appTransactionId },
        data: {
          solanaFinalized: new Date(),
          solanaTransaction: solanaTransaction ? JSON.parse(JSON.stringify(solanaTransaction)) : undefined,
          status: AppTransactionStatus.Finalized,
        },
      })
      this.logger.verbose(`${appKey}: confirmSignature: finished ${signature}`)
    }
  }
}
