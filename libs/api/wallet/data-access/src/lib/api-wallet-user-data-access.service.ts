import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { ApiWebhookDataAccessService } from '@kin-kinetic/api/webhook/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ClusterStatus, WebhookType } from '@prisma/client'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletAirdropResponse } from './entity/wallet-airdrop-response.entity'
import { WalletBalance } from './entity/wallet-balance.entity'
import { WalletType } from './entity/wallet-type.enum'
import { Wallet } from './entity/wallet.entity'

@Injectable()
export class ApiWalletUserDataAccessService {
  private readonly logger = new Logger(ApiWalletUserDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService, private readonly webhook: ApiWebhookDataAccessService) {}

  @Cron('25 * * * * *')
  async checkBalance() {
    const appEnvs = await this.data.appEnv.findMany({
      where: { cluster: { status: ClusterStatus.Active } },
      include: {
        app: true,
        cluster: true,
        wallets: {
          include: {
            balances: { orderBy: { createdAt: 'desc' }, take: 1 },
          },
        },
      },
    })
    for (const appEnv of appEnvs) {
      for (const wallet of appEnv.wallets) {
        await this.updateWalletBalance(appEnv.id, appEnv?.name, appEnv?.app.index, wallet)
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
      const { publicKey, secretKey } = Keypair.fromByteArray(JSON.parse(secret))

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
    const solana = await this.data.getSolanaConnection(appEnv.name, appEnv.app.index)
    const floatAmount = parseFloat(amount?.toString())
    const signature = await solana.requestAirdrop(wallet.publicKey, floatAmount * LAMPORTS_PER_SOL)

    return {
      signature,
    }
  }

  async userWalletBalance(userId: string, appEnvId: string, walletId: string): Promise<WalletBalance> {
    const wallet = await this.userWallet(userId, appEnvId, walletId)
    const appEnv = await this.data.getAppEnvById(appEnvId)
    await this.data.ensureAppUser(userId, appEnv.app.id)
    const solana = await this.data.getSolanaConnection(appEnv.name, appEnv.app.index)

    const balance = await solana.getBalanceSol(wallet.publicKey)

    return { balance: BigInt(balance) }
  }

  async userWalletBalances(userId: string, appEnvId: string, walletId: string): Promise<WalletBalance[]> {
    const wallet = await this.userWallet(userId, appEnvId, walletId)
    return this.data.walletBalance.findMany({
      where: { appEnvId, walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
    })
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

  private storeWalletBalance(appEnvId: string, walletId: string, balance: number, change: number) {
    return this.data.walletBalance.create({
      data: { appEnvId, balance, change, walletId },
      include: { appEnv: { include: { app: true } }, wallet: { select: { id: true, publicKey: true } } },
    })
  }

  private async updateWalletBalance(appEnvId: string, environment: string, index: number, wallet: Wallet) {
    const appKey = this.data.getAppKey(environment, index)
    const solana = await this.data.getSolanaConnection(environment, index)
    const current = wallet.balances?.length ? wallet.balances[0].balance : 0
    const balance = await solana.getBalanceSol(wallet.publicKey)
    if (BigInt(balance) !== current) {
      const change = balance - Number(current)
      const stored = await this.storeWalletBalance(appEnvId, wallet.id, balance, change)
      const { appEnv } = await this.data.getAppEnvironment(environment, index)
      if (Number(appEnv.webhookBalanceThreshold) <= balance) {
        this.webhook.sendWebhook(appEnv, { type: WebhookType.Balance, balance: stored })
      }
      this.logger.verbose(
        `${appKey}: Updated Wallet Balance: ${wallet.publicKey} ${current} => ${balance} (${change} SOL) threshold (${
          appEnv.webhookBalanceThreshold ?? 'None'
        } )`,
      )
    }
  }
}
