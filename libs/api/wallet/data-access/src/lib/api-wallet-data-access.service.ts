import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Injectable, NotFoundException } from '@nestjs/common'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletAirdropResponse } from './entity/wallet-airdrop-response.entity'
import { WalletBalance } from './entity/wallet-balance.entity'

@Injectable()
export class ApiWalletDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async deleteWallet(userId: string, walletId: string) {
    await this.ensureWalletById(userId, walletId)
    return this.data.wallet.delete({ where: { id: walletId } })
  }

  async generateWallet(userId: string) {
    await this.data.ensureAdminUser(userId)
    const mnemonic = Keypair.generateMnemonic()
    const keyPair = Keypair.fromMnemonicSet(mnemonic, 0, 1)[0]
    return this.data.wallet.create({ data: { mnemonic, publicKey: keyPair.publicKey } })
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
    const sol = await this.data.solana.getBalanceSol(wallet.publicKey)

    return {
      sol: sol / LAMPORTS_PER_SOL,
    }
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
}
