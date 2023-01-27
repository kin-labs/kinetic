import { ApiAppDataAccessService } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { ApiKineticService, CloseAccountRequest } from '@kin-kinetic/api/kinetic/data-access'
import { Transaction } from '@kin-kinetic/api/transaction/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { BalanceMint, BalanceSummary, Commitment, parseAndSignTransaction, PublicKeyString } from '@kin-kinetic/solana'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { Request } from 'express'

import { CreateAccountRequest } from './dto/create-account-request.dto'

@Injectable()
export class ApiAccountDataAccessService implements OnModuleInit {
  private createAccountRequestCounter: Counter
  private createAccountErrorMintNotFoundCounter: Counter
  private createAccountSolanaTransactionSuccessCounter: Counter
  private createAccountSolanaTransactionErrorCounter: Counter

  constructor(
    readonly data: ApiCoreDataAccessService,
    private readonly app: ApiAppDataAccessService,
    readonly kinetic: ApiKineticService,
  ) {}

  onModuleInit() {
    const createPrefix = 'api_account_create_account'
    this.createAccountRequestCounter = this.data.metrics.getCounter(`${createPrefix}_request`, {
      description: 'Number of createAccount requests',
    })
    this.createAccountErrorMintNotFoundCounter = this.data.metrics.getCounter(`${createPrefix}_error_mint_not_found`, {
      description: 'Number of createAccount mint not found errors',
    })
    this.createAccountSolanaTransactionSuccessCounter = this.data.metrics.getCounter(
      `${createPrefix}_send_solana_transaction_success`,
      {
        description: 'Number of createAccount Solana transaction success',
      },
    )
    this.createAccountSolanaTransactionErrorCounter = this.data.metrics.getCounter(
      `${createPrefix}_send_solana_transaction_error`,
      {
        description: 'Number of createAccount Solana transaction errors',
      },
    )
  }

  async closeAccount(req: Request, input: CloseAccountRequest): Promise<Transaction> {
    const appKey = getAppKey(input.environment, input.index)
    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
    // FIXME: Validating the request should be done in a NestJS guard or interceptor, not here
    const { ip, ua } = this.kinetic.validateRequest(appEnv, req)

    return this.kinetic.handleCloseAccount(input, { appEnv, appKey, ip, ua })
  }

  async getBalance(appKey: string, account: PublicKeyString, commitment: Commitment): Promise<BalanceSummary> {
    const solana = await this.kinetic.getSolanaConnection(appKey)
    const appEnv = await this.app.getAppConfig(appKey)

    // Get the mints for this app environment
    const mints: BalanceMint[] = appEnv.mints.map(({ decimals, publicKey }) => ({ decimals, publicKey }))

    // Get the token accounts for the mints
    const mintAccounts = await this.kinetic.getMintAccounts(appKey, account, commitment, mints)

    // Get the balances for the token accounts
    return solana.getMintAccountBalance(mintAccounts, commitment)
  }

  async createAccount(req: Request, input: CreateAccountRequest): Promise<Transaction> {
    const processingStartedAt = Date.now()
    const appKey = getAppKey(input.environment, input.index)
    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
    this.createAccountRequestCounter.add(1, { appKey })

    // FIXME: Validating the request should be done in a NestJS guard or interceptor, not here
    const { ip, ua } = this.kinetic.validateRequest(appEnv, req)

    const mint = this.kinetic.validateMint(appEnv, appKey, input.mint)

    // Process the Solana transaction
    const signer = Keypair.fromSecret(mint.wallet?.secretKey)

    const {
      blockhash,
      feePayer,
      source,
      transaction: solanaTransaction,
    } = parseAndSignTransaction({
      tx: Buffer.from(input.tx, 'base64'),
      signer: signer.solana,
    })

    return this.kinetic.processTransaction({
      appEnv,
      appKey,
      blockhash,
      commitment: input.commitment,
      decimals: mint?.mint?.decimals,
      feePayer,
      headers: req.headers as Record<string, string>,
      ip,
      lastValidBlockHeight: input.lastValidBlockHeight,
      mintPublicKey: mint?.mint?.address,
      processingStartedAt,
      reference: input.reference,
      solanaTransaction,
      source,
      tx: input.tx,
      ua,
    })
  }
}
