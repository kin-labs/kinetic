import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { ApiKineticService } from '@kin-kinetic/api/kinetic/data-access'
import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Counter } from '@opentelemetry/api-metrics'
import { Prisma } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AppConfig } from './entity/app-config.entity'
import { AppHealth } from './entity/app-health.entity'

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

  constructor(private readonly data: ApiCoreDataAccessService, private readonly kinetic: ApiKineticService) {}

  async onModuleInit() {
    this.getAppConfigErrorCounter = this.data.metrics.getCounter('api_app_get_app_config_error_counter', {
      description: 'Number of getAppConfig errors',
    })
    this.getAppConfigSuccessCounter = this.data.metrics.getCounter('api_app_get_app_config_success_counter', {
      description: 'Number of getAppConfig success',
    })
  }

  async getAppConfig(appKey: string): Promise<AppConfig> {
    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
    if (!appEnv) {
      this.getAppConfigErrorCounter.add(1, { appKey })
      throw new NotFoundException(`App not found :(`)
    }
    this.getAppConfigSuccessCounter.add(1, { appKey })
    this.logger.verbose(`getAppConfig ${appKey}`)
    const mints = appEnv?.mints?.map(({ addMemo, mint, wallet }) => ({
      addMemo: !!addMemo,
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
      api: {
        name: this.data.config.apiName,
        version: this.data.config.apiVersion,
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

  async getAppHealth(appKey: string): Promise<AppHealth> {
    const isKineticOk = true
    const solana = await this.kinetic.getSolanaConnection(appKey)

    const isSolanaOk = await solana.healthCheck()

    return {
      isSolanaOk,
      isKineticOk,
      time: new Date(),
    }
  }
}
