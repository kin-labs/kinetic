import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ClusterStatus } from '@prisma/client'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletAirdropResponse } from './entity/wallet-airdrop-response.entity'
import { WalletBalance } from './entity/wallet-balance.entity'
import { Wallet } from './entity/wallet.entity'

@Injectable()
export class ApiWalletDataAccessService {
  private readonly logger = new Logger(ApiWalletDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService) {}

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

  async deleteWallet(userId: string, walletId: string) {
    await this.ensureWalletById(userId, walletId)
    return this.data.wallet.delete({ where: { id: walletId } })
  }

  async generateWallet(userId: string, index: number) {
    await this.data.ensureAdminUser(userId)
    const { publicKey, secretKey } = this.getAppKeypair(index)

    return this.data.wallet.create({ data: { secretKey, publicKey } })
  }

  async wallet(userId: string, walletId: string) {
    await this.ensureWalletById(userId, walletId)
    return this.data.wallet.findUnique({ where: { id: walletId } })
  }

  async walletAirdrop(
    userId: string,
    appEnvId: string,
    walletId: string,
    amount: number,
  ): Promise<WalletAirdropResponse> {
    const wallet = await this.ensureWalletById(userId, walletId)
    const appEnv = await this.data.getAppEnvById(appEnvId)
    const solana = await this.data.getSolanaConnection(appEnv.name, appEnv.app.index)
    const floatAmount = parseFloat(amount?.toString())
    const signature = await solana.requestAirdrop(wallet.publicKey, floatAmount * LAMPORTS_PER_SOL)

    return {
      signature,
    }
  }

  async walletBalance(userId: string, appEnvId: string, walletId: string): Promise<WalletBalance> {
    const wallet = await this.ensureWalletById(userId, walletId)
    const appEnv = await this.data.getAppEnvById(appEnvId)
    const solana = await this.data.getSolanaConnection(appEnv.name, appEnv.app.index)

    const balance = await solana.getBalanceSol(wallet.publicKey)

    return { balance: BigInt(balance) }
  }

  async walletBalances(userId: string, appEnvId: string, walletId: string): Promise<WalletBalance[]> {
    const wallet = await this.ensureWalletById(userId, walletId)
    return this.data.walletBalance.findMany({
      where: { appEnvId, walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
    })
  }

  async wallets(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.wallet.findMany()
  }

  private async ensureWalletById(userId: string, walletId: string) {
    await this.data.ensureAdminUser(userId)
    const wallet = await this.data.wallet.findUnique({ where: { id: walletId } })
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${walletId} does not exist.`)
    }
    return wallet
  }

  private getAppKeypair(index: number): Keypair {
    const envVar = process.env[`APP_${index}_FEE_PAYER_BYTE_ARRAY`]
    if (envVar) {
      this.logger.verbose(`getAppKeypair app ${index}: read from env var`)
      return Keypair.fromByteArray(JSON.parse(envVar))
    }
    this.logger.verbose(`getAppKeypair app ${index}: generated new keypair`)
    return Keypair.generate()
  }

  private storeWalletBalance(appEnvId: string, walletId: string, balance: number, change: number) {
    return this.data.walletBalance.create({ data: { appEnvId, balance, change, walletId } })
  }

  private async updateWalletBalance(appEnvId: string, environment: string, index: number, wallet: Wallet) {
    const appKey = this.data.getAppKey(environment, index)
    const solana = await this.data.getSolanaConnection(environment, index)
    const current = wallet.balances?.length ? wallet.balances[0].balance : 0
    const balance = await solana.getBalanceSol(wallet.publicKey)
    if (BigInt(balance) !== current) {
      const change = balance - Number(current)
      await this.storeWalletBalance(appEnvId, wallet.id, balance, change)
      this.logger.verbose(
        `${appKey}: Updated Wallet Balance: ${wallet.publicKey} ${current} => ${balance} (${change} SOL)`,
      )
    }
  }
}
