import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Keypair } from '@mogami/keypair'
import { Injectable, NotFoundException } from '@nestjs/common'

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
