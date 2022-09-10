import { ApiAppDataAccessService } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import {
  ApiTransactionDataAccessService,
  Transaction,
  TransactionWithErrors,
} from '@kin-kinetic/api/transaction/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { BalanceSummary, Commitment, parseAndSignTransaction, PublicKeyString } from '@kin-kinetic/solana'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { Request } from 'express'
import { CreateAccountRequest } from './dto/create-account-request.dto'
import { HistoryResponse } from './entities/history.entity'

@Injectable()
export class ApiAccountDataAccessService implements OnModuleInit {
  private createAccountRequestCounter: Counter
  private createAccountErrorMintNotFoundCounter: Counter
  private createAccountSolanaTransactionSuccessCounter: Counter
  private createAccountSolanaTransactionErrorCounter: Counter

  constructor(
    readonly data: ApiCoreDataAccessService,
    private readonly app: ApiAppDataAccessService,
    private readonly transaction: ApiTransactionDataAccessService,
  ) {}

  onModuleInit() {
    const prefix = 'api_account_create_account'
    this.createAccountRequestCounter = this.data.metrics.getCounter(`${prefix}_request`, {
      description: 'Number of createAccount requests',
    })
    this.createAccountErrorMintNotFoundCounter = this.data.metrics.getCounter(`${prefix}_error_mint_not_found`, {
      description: 'Number of createAccount mint not found errors',
    })
    this.createAccountSolanaTransactionSuccessCounter = this.data.metrics.getCounter(
      `${prefix}_send_solana_transaction_success`,
      {
        description: 'Number of createAccount Solana transaction success',
      },
    )
    this.createAccountSolanaTransactionErrorCounter = this.data.metrics.getCounter(
      `${prefix}_send_solana_transaction_error`,
      {
        description: 'Number of createAccount Solana transaction errors',
      },
    )
  }

  async getAccountInfo(environment: string, index: number, accountId: PublicKeyString, commitment?: Commitment) {
    const solana = await this.data.getSolanaConnection(environment, index)

    return solana.getAccountInfo(accountId, { commitment })
  }

  async getBalance(environment: string, index: number, accountId: PublicKeyString): Promise<BalanceSummary> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)

    const mints = appEnv.mints.map(({ publicKey }) => publicKey)

    return solana.getBalance(accountId, mints)
  }

  async getHistory(
    environment: string,
    index: number,
    accountId: PublicKeyString,
    mint?: PublicKeyString,
  ): Promise<HistoryResponse[]> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)
    mint = mint || appEnv.mint.publicKey

    return solana.getTokenHistory(accountId, mint.toString())
  }

  async getTokenAccounts(
    environment: string,
    index: number,
    accountId: PublicKeyString,
    mint?: PublicKeyString,
  ): Promise<string[]> {
    const solana = await this.data.getSolanaConnection(environment, index)
    const appEnv = await this.app.getAppConfig(environment, index)
    mint = mint || appEnv.mint.publicKey

    return solana.getTokenAccounts(accountId, mint.toString())
  }

  async createAccount(req: Request, input: CreateAccountRequest): Promise<Transaction> {
    const { appEnv, appKey } = await this.data.getAppEnvironment(input.environment, input.index)
    this.createAccountRequestCounter.add(1, { appKey })

    const { ip, ua } = this.transaction.validateRequest(appEnv, req)

    const mint = this.transaction.validateMint(appEnv, appKey, input.mint)

    // Create the Transaction
    const transaction: TransactionWithErrors = await this.transaction.createTransaction({
      appEnvId: appEnv.id,
      commitment: input.commitment,
      ip,
      referenceId: input.referenceId,
      referenceType: input.referenceType,
      ua,
    })

    // Process the Solana transaction
    const signer = Keypair.fromSecretKey(mint.wallet?.secretKey)

    const {
      blockhash,
      feePayer,
      source,
      transaction: solanaTransaction,
    } = parseAndSignTransaction({
      tx: Buffer.from(input.tx, 'base64'),
      signer: signer.solana,
    })

    return this.transaction.handleTransaction({
      appEnv,
      appKey,
      transaction,
      blockhash,
      commitment: input?.commitment,
      decimals: mint?.mint?.decimals,
      feePayer,
      headers: req.headers as Record<string, string>,
      lastValidBlockHeight: input?.lastValidBlockHeight,
      mintPublicKey: mint?.mint?.address,
      solanaTransaction,
      source,
    })
  }
}
