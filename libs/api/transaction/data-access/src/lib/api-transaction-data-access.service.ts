import { ApiCoreDataAccessService, AppEnvironment } from '@kin-kinetic/api/core/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { ApiKineticService, TransactionWithErrors } from '@kin-kinetic/api/kinetic/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment, parseAndSignTokenTransfer } from '@kin-kinetic/solana'
import { BadRequestException, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { AppEnv, Transaction, TransactionErrorType, TransactionStatus } from '@prisma/client'
import { Request } from 'express'
import * as requestIp from 'request-ip'
import { MakeTransferRequest } from './dto/make-transfer-request.dto'
import { MinimumRentExemptionBalanceRequest } from './dto/minimum-rent-exemption-balance-request.dto'
import { GetTransactionResponse } from './entities/get-transaction-response.entity'
import { LatestBlockhashResponse } from './entities/latest-blockhash.entity'
import { MinimumRentExemptionBalanceResponse } from './entities/minimum-rent-exemption-balance-response.entity'

function getExpiredTime(minutes: number) {
  return new Date(new Date().getTime() - minutes * 60_000)
}

@Injectable()
export class ApiTransactionDataAccessService implements OnModuleInit {
  private logger = new Logger(ApiTransactionDataAccessService.name)

  private makeTransferMintNotFoundErrorCounter: Counter
  private markTransactionTimeoutCounter: Counter
  private makeTransferRequestCounter: Counter

  constructor(readonly data: ApiCoreDataAccessService, private readonly kinetic: ApiKineticService) {}

  async cleanupStaleTransactions() {
    const stale = await this.getExpiredTransactions()
    if (!stale.length) return
    this.timeoutTransactions(stale.map((item) => item.id)).then((res) => {
      this.logger.verbose(
        `cleanupStaleTransactions set ${stale?.length} stale transactions: ${res.map((item) => item.id)} `,
      )
    })
  }

  private getExpiredTransactions(): Promise<Transaction[]> {
    const expiredMinutes = 5
    const expired = getExpiredTime(expiredMinutes)
    return this.data.transaction.findMany({
      where: {
        status: { notIn: [TransactionStatus.Finalized, TransactionStatus.Failed] },
        updatedAt: { lt: expired },
      },
    })
  }

  private timeoutTransactions(ids: string[]): Promise<Transaction[]> {
    return Promise.all(ids.map((id) => this.timeoutTransaction(id)))
  }

  private timeoutTransaction(id: string): Promise<Transaction> {
    return this.data.transaction.update({
      where: { id: id },
      data: {
        status: TransactionStatus.Failed,
        errors: {
          create: {
            type: TransactionErrorType.Timeout,
            message: `Transaction timed out`,
          },
        },
      },
    })
  }

  onModuleInit() {
    this.makeTransferMintNotFoundErrorCounter = this.data.metrics.getCounter(
      `api_transaction_make_transfer_mint_not_found_error_counter`,
      { description: 'Number of makeTransfer mint not found errors' },
    )
    this.makeTransferRequestCounter = this.data.metrics.getCounter(`api_transaction_make_transfer_request_counter`, {
      description: 'Number of requests to makeTransfer',
    })
    this.markTransactionTimeoutCounter = this.data.metrics.getCounter(
      `api_transaction_mark_transaction_timeout_counter`,
      {
        description: 'Number of transactions that are marked as Timeout',
      },
    )
  }

  async getLatestBlockhash(appKey: string): Promise<LatestBlockhashResponse> {
    return this.data.cache.wrap<LatestBlockhashResponse>(
      'solana',
      `${appKey}:getLatestBlockhash`,
      () => this.kinetic.getSolanaConnection(appKey).then((solana) => solana.getLatestBlockhash()),
      this.data.config.cache.solana.getLatestBlockhash.ttl,
    )
  }

  async getMinimumRentExemptionBalance(
    appKey: string,
    { dataLength }: MinimumRentExemptionBalanceRequest,
  ): Promise<MinimumRentExemptionBalanceResponse> {
    const solana = await this.kinetic.getSolanaConnection(appKey)
    const lamports = await solana.getMinimumBalanceForRentExemption(dataLength)

    return { lamports } as MinimumRentExemptionBalanceResponse
  }

  validateRequest(appEnv: AppEnv, req: Request): { ip: string; ua: string } {
    const ip = requestIp.getClientIp(req)
    const ua = `${req.headers['kinetic-user-agent'] || req.headers['user-agent']}`

    if (appEnv?.ipsAllowed.length > 0 && !appEnv?.ipsAllowed.includes(ip)) {
      throw new UnauthorizedException('Request not allowed')
    }

    if (appEnv?.ipsBlocked.length > 0 && appEnv?.ipsBlocked.includes(ip)) {
      throw new UnauthorizedException('Request not allowed')
    }

    if (appEnv?.uasAllowed.length > 0 && !appEnv?.uasAllowed.includes(ua)) {
      throw new UnauthorizedException('Request not allowed')
    }

    if (appEnv?.uasBlocked.length > 0 && appEnv?.uasBlocked.includes(ua)) {
      throw new UnauthorizedException('Request not allowed')
    }
    return { ip, ua }
  }

  validateMint(appEnv: AppEnvironment, appKey: string, inputMint: string) {
    const found = appEnv.mints.find(({ mint }) => mint.address === inputMint)
    if (!found) {
      this.makeTransferMintNotFoundErrorCounter.add(1, { appKey, mint: inputMint.toString() })
      throw new BadRequestException(`${appKey}: Can't find mint ${inputMint}`)
    }
    return found
  }

  async makeTransfer(req: Request, input: MakeTransferRequest): Promise<TransactionWithErrors> {
    const appKey = getAppKey(input.environment, input.index)
    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
    this.makeTransferRequestCounter.add(1, { appKey })

    const { ip, ua } = this.validateRequest(appEnv, req)

    const mint = this.validateMint(appEnv, appKey, input.mint)

    // Create the Transaction
    const transaction: TransactionWithErrors = await this.createTransaction({
      appEnvId: appEnv.id,
      commitment: input.commitment,
      ip,
      referenceId: input.referenceId,
      referenceType: input.referenceType,
      tx: input.tx,
      ua,
    })

    // Process the Solana transaction
    const signer = Keypair.fromSecret(mint.wallet?.secretKey)

    const {
      amount,
      blockhash,
      destination,
      feePayer,
      source,
      transaction: solanaTransaction,
    } = parseAndSignTokenTransfer({
      tx: Buffer.from(input.tx, 'base64'),
      signer: signer.solana,
    })

    return this.kinetic.processTransaction({
      amount,
      appEnv,
      appKey,
      transaction,
      blockhash,
      commitment: input?.commitment,
      decimals: mint?.mint?.decimals,
      destination: destination?.pubkey.toBase58(),
      feePayer,
      headers: req.headers as Record<string, string>,
      lastValidBlockHeight: input?.lastValidBlockHeight,
      mintPublicKey: mint?.mint?.address,
      solanaTransaction,
      source,
    })
  }

  async getTransaction(appKey: string, signature: string, commitment: Commitment): Promise<GetTransactionResponse> {
    const solana = await this.kinetic.getSolanaConnection(appKey)

    return solana.getTransaction(signature, commitment)
  }

  createTransaction({
    appEnvId,
    commitment,
    ip,
    referenceId,
    referenceType,
    tx,
    ua,
  }: {
    appEnvId: string
    commitment: Commitment
    ip: string
    referenceId?: string
    referenceType?: string
    tx?: string
    ua: string
  }): Promise<TransactionWithErrors> {
    return this.data.transaction.create({
      data: {
        appEnvId,
        commitment,
        ip,
        referenceId,
        referenceType,
        tx,
        ua,
      },
      include: { errors: true },
    })
  }
}
