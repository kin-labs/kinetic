import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { ApiKineticService } from '@kin-kinetic/api/kinetic/data-access'
import { ApiWebhookDataAccessService } from '@kin-kinetic/api/webhook/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { ClusterStatus, WalletType, WebhookType } from '@prisma/client'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletAirdropResponse } from './entity/wallet-airdrop-response.entity'

@Injectable()
export class ApiWalletUserDataAccessService implements OnModuleInit {
  private readonly logger = new Logger(ApiWalletUserDataAccessService.name)
  constructor(
    private readonly data: ApiCoreDataAccessService,
    private readonly kinetic: ApiKineticService,
    private readonly webhook: ApiWebhookDataAccessService,
  ) {}

  async onModuleInit(): Promise<void> {
    // MIGRATION: This migration will be removed in v1.0.0
    // The wallet balance history will no longer be stored in the database
    // Any old records will be deleted
    const balances = await this.data.walletBalance.count()
    if (balances > 0) {
      this.logger.warn(`MIGRATION: Deleting ${balances} wallet balance records`)
      await this.data.walletBalance.deleteMany()
    }
  }

  async checkBalance() {
    const appEnvs = await this.data.appEnv.findMany({
      where: {
        cluster: { status: ClusterStatus.Active },
        webhookBalanceEnabled: true,
        webhookBalanceThreshold: { not: null },
      },
      include: {
        app: true,
        cluster: true,
        wallets: {
          include: {
            appMints: true,
          },
        },
      },
    })

    for (const appEnv of appEnvs) {
      const appKey = getAppKey(appEnv.name, appEnv.app.index)
      const solana = await this.kinetic.getSolanaConnection(appKey)

      for (const { publicKey } of appEnv.wallets.filter((w) => w.appMints?.length)) {
        const lamports = await solana.getBalanceSol(publicKey)
        const balance = lamports / LAMPORTS_PER_SOL
        const threshold = Number(appEnv.webhookBalanceThreshold)

        const isBelowThreshold = balance / LAMPORTS_PER_SOL < threshold

        this.logger.debug(
          `${appKey}: Balance for ${publicKey} is ${
            isBelowThreshold ? 'below' : 'above'
          } threshold (${balance}/${threshold} SOL)`,
        )

        if (isBelowThreshold) {
          await this.webhook.sendWebhook(appEnv, { type: WebhookType.Balance, balance, publicKey })
          this.logger.debug(`${appKey}: Sending Wallet Balance Webhook: ${publicKey}`)
        }
      }
    }
  }

  async userDeleteWallet(userId: string, appEnvId: string, walletId: string) {
    const wallet = await this.userWallet(userId, appEnvId, walletId)
    if (wallet.appEnvs?.length) {
      throw new BadRequestException(`You can't delete a wallet that has environments`)
    }
    return this.data.wallet.delete({ where: { id: walletId } })
  }

  async userGenerateWallet(userId: string, appEnvId: string) {
    const appEnv = await this.data.getAppEnvById(appEnvId)
    await this.data.ensureAppOwner(userId, appEnv.app.id)
    const { publicKey, secretKey } = Keypair.random()

    return this.data.wallet.create({
      data: {
        secretKey,
        publicKey,
        appEnvs: { connect: { id: appEnvId } },
        type: WalletType.Generated,
        ownerId: userId,
      },
      include: { appEnvs: true },
    })
  }

  async userImportWallet(userId: string, appEnvId: string, secret: string) {
    const appEnv = await this.data.getAppEnvById(appEnvId)
    await this.data.ensureAppOwner(userId, appEnv.app.id)

    try {
      const { publicKey, secretKey } = Keypair.fromSecret(secret.trim())

      return this.data.wallet.create({
        data: {
          secretKey,
          publicKey,
          appEnvs: { connect: { id: appEnvId } },
          type: WalletType.Imported,
          ownerId: userId,
        },
      })
    } catch (e) {
      throw new BadRequestException(`Error importing wallet`)
    }
  }

  async userWallet(userId: string, appEnvId: string, walletId: string) {
    const appEnv = await this.data.getAppEnvById(appEnvId)
    await this.data.ensureAppUser(userId, appEnv.app.id)
    await this.ensureWalletById(walletId)
    const wallet = await this.data.wallet.findUnique({
      where: { id: walletId },
      include: { appEnvs: true, appMints: { include: { mint: true } } },
    })
    delete wallet.secretKey
    return wallet
  }

  async userWalletAirdrop(
    userId: string,
    appEnvId: string,
    walletId: string,
    amount: number,
  ): Promise<WalletAirdropResponse> {
    const wallet = await this.userWallet(userId, appEnvId, walletId)
    const appEnv = await this.data.getAppEnvById(appEnvId)
    const appKey = getAppKey(appEnv.name, appEnv.app.index)
    const solana = await this.kinetic.getSolanaConnection(appKey)
    const floatAmount = parseFloat(amount?.toString())
    const signature = await solana.requestAirdrop(wallet.publicKey, floatAmount * LAMPORTS_PER_SOL)

    return {
      signature,
    }
  }

  async userWalletBalance(userId: string, appEnvId: string, walletId: string): Promise<string> {
    const wallet = await this.userWallet(userId, appEnvId, walletId)
    const appEnv = await this.data.getAppEnvById(appEnvId)
    await this.data.ensureAppUser(userId, appEnv.app.id)
    const appKey = getAppKey(appEnv.name, appEnv.app.index)
    const solana = await this.kinetic.getSolanaConnection(appKey)

    const balance = await solana.getBalanceSol(wallet.publicKey)

    return balance.toString()
  }

  async userWallets(userId: string, appEnvId: string) {
    const appEnv = await this.data.getAppEnvById(appEnvId)
    await this.data.ensureAppUser(userId, appEnv.app.id)
    const wallets = await this.data.wallet.findMany({
      where: { appEnvs: { some: { id: appEnvId } } },
      include: {
        appMints: {
          include: { mint: true },
        },
      },
    })

    return wallets.map((wallet) => {
      delete wallet.secretKey
      return wallet
    })
  }

  private async ensureWalletById(walletId: string) {
    const wallet = await this.data.wallet.findUnique({ where: { id: walletId } })
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${walletId} does not exist.`)
    }
    return wallet
  }
}
