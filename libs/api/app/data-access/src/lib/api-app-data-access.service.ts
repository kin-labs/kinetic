import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { Prisma } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AppConfig } from './entity/app-config.entity'
import { AppHealth } from './entity/app-health.entity'
import { AppTransaction } from './entity/app-transaction.entity'

@Injectable()
export class ApiAppDataAccessService implements OnModuleInit {
  readonly includeAppEnv: Prisma.AppEnvInclude = {
    app: true,
    cluster: {
      include: {
        mints: {
          orderBy: { order: 'asc' },
        },
      },
    },
    mints: {
      include: {
        mint: true,
        wallet: true,
      },
    },
    wallets: true,
  }
  readonly include: Prisma.AppInclude = {
    users: { include: { user: true } },
    envs: {
      orderBy: { name: 'asc' },
      include: this.includeAppEnv,
    },
  }

  private readonly logger = new Logger(ApiAppDataAccessService.name)
  private getAppConfigErrorCounter: Counter
  private getAppConfigSuccessCounter: Counter

  constructor(private readonly data: ApiCoreDataAccessService) {}

  async onModuleInit() {
    this.getAppConfigErrorCounter = this.data.metrics.getCounter('api_app_get_app_config_error_counter', {
      description: 'Number of getAppConfig errors',
    })
    this.getAppConfigSuccessCounter = this.data.metrics.getCounter('api_app_get_app_config_success_counter', {
      description: 'Number of getAppConfig success',
    })
  }

  async getAppConfig(environment: string, index: number): Promise<AppConfig> {
    const { appEnv, appKey } = await this.data.getAppEnvironment(environment, index)
    if (!appEnv) {
      this.getAppConfigErrorCounter.add(1, { appKey })
      throw new NotFoundException(`App not found :(`)
    }
    this.getAppConfigSuccessCounter.add(1, { appKey })
    this.logger.verbose(`getAppConfig ${appKey}`)
    const mints = appEnv?.mints?.map(({ mint, wallet }) => ({
      airdrop: !!mint.airdropSecretKey,
      airdropAmount: mint.airdropAmount,
      airdropMax: mint.airdropMax,
      decimals: mint.decimals,
      feePayer: wallet.publicKey,
      logoUrl: mint?.logoUrl,
      name: mint?.name,
      programId: TOKEN_PROGRAM_ID.toBase58(),
      publicKey: mint?.address,
      symbol: mint?.symbol,
    }))

    if (!mints?.length) {
      throw new Error(`${appKey}: no mints found.`)
    }

    return {
      app: {
        index: appEnv.app.index,
        name: appEnv.app.name,
      },
      environment: {
        name: appEnv.name,
        explorer: appEnv.cluster.explorer,
        cluster: {
          endpoint: appEnv.cluster.endpointPublic,
          id: appEnv.cluster.id,
          name: appEnv.cluster.name,
          type: appEnv.cluster.type,
        },
      },
      mint: mints[0],
      mints,
    }
  }

  async getAppHealth(environment: string, index: number): Promise<AppHealth> {
    const isKineticOk = true
    const solana = await this.data.getSolanaConnection(environment, index)

    const isSolanaOk = await solana.healthCheck()

    return {
      isSolanaOk,
      isKineticOk,
      time: new Date(),
    }
  }

  explorerUrl(tx: AppTransaction) {
    const { explorer } = tx.appEnv.cluster

    return explorer.replace('{path}', `/tx/${tx.signature}`)
  }

  processingDuration(tx: AppTransaction) {
    if (!tx.createdAt || !tx.solanaStart) return null
    return tx?.solanaStart?.getTime() - tx?.createdAt?.getTime()
  }

  solanaCommittedDuration(tx: AppTransaction) {
    if (!tx.solanaCommitted || !tx.solanaStart) return null
    return tx?.solanaCommitted?.getTime() - tx?.solanaStart?.getTime()
  }

  solanaFinalizedDuration(tx: AppTransaction) {
    if (!tx.solanaFinalized || !tx.solanaStart) return null
    return tx?.solanaFinalized?.getTime() - tx?.solanaStart?.getTime()
  }

  totalDuration(tx: AppTransaction) {
    if (!tx.solanaFinalized) return null
    return tx?.solanaFinalized?.getTime() - tx?.createdAt?.getTime()
  }

  webhookEventDuration(tx: AppTransaction) {
    if (!tx.webhookEventEnd || !tx.webhookEventStart) return null
    return tx?.webhookEventEnd?.getTime() - tx?.webhookEventStart?.getTime()
  }

  webhookVerifyDuration(tx: AppTransaction) {
    if (!tx.webhookVerifyEnd || !tx.webhookVerifyStart) return null
    return tx?.webhookVerifyEnd?.getTime() - tx?.webhookVerifyStart?.getTime()
  }
}
