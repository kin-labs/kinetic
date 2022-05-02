import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletAirdropResponse } from './entity/wallet-airdrop-response.entity'
import { WalletBalance } from './entity/wallet-balance.entity'

@Injectable()
export class ApiWalletDataAccessService {
  private readonly logger = new Logger(ApiWalletDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService) {}

  @Cron('25 * * * * *')
  async checkBalance() {
    const wallets = await this.data.wallet.findMany({
      include: { balances: { orderBy: { createdAt: 'desc' }, take: 1 } },
    })
    for (const wallet of wallets) {
      const current = wallet.balances?.length ? wallet.balances[0].balance : 0
      const balance = await this.data.solana.getBalanceSol(wallet.publicKey)
      if (balance !== current) {
        const stored = await this.storeWalletBalance(wallet.id, balance)
        this.logger.verbose(`Stored Wallet Balance: ${wallet.publicKey} ${current} => ${balance} [${stored.id}]`)
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

  async walletAirdrop(userId: string, walletId: string, amount: number): Promise<WalletAirdropResponse> {
    const wallet = await this.ensureWalletById(userId, walletId)
    const floatAmount = parseFloat(amount?.toString())
    const signature = await this.data.solana.requestAirdrop(wallet.publicKey, floatAmount * LAMPORTS_PER_SOL)

    return {
      signature,
    }
  }

  async walletBalance(userId: string, walletId: string): Promise<WalletBalance> {
    const wallet = await this.ensureWalletById(userId, walletId)
    const balance = await this.data.solana.getBalanceSol(wallet.publicKey)

    return { balance }
  }

  async walletBalances(userId: string, walletId: string): Promise<WalletBalance[]> {
    const wallet = await this.ensureWalletById(userId, walletId)
    return this.data.walletBalance.findMany({ where: { walletId: wallet.id }, orderBy: { createdAt: 'desc' } })
  }

  async wallets(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.wallet.findMany()
  }

  private async ensureWalletById(userId: string, walletId: string) {
    await this.data.ensureAdminUser(userId)
    const wallet = await this.data.wallet.findUnique({ where: { id: walletId }, include: { apps: true } })
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${walletId} does not exist.`)
    }
    return wallet
  }

  private getAppKeypair(index: number): Keypair {
    const envVar = process.env[`APP_${index}_FEE_PAYER_BYTE_ARRAY`]
    if (envVar) {
      this.logger.verbose(`getAppKeypair for app with index ${index} from env var`)
      return Keypair.fromByteArray(JSON.parse(envVar))
    }
    this.logger.verbose(`getAppKeypair for app with index ${index} generated new keypair`)
    return Keypair.generate()
  }

  private storeWalletBalance(walletId: string, balance: number) {
    return this.data.walletBalance.create({ data: { balance, walletId } })
  }
}
