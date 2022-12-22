import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class ApiWalletAdminDataAccessService {
  private readonly include: Prisma.WalletInclude = {
    appEnvs: {
      include: {
        app: true,
        cluster: true,
        mints: {
          include: {
            mint: true,
            wallet: true,
          },
        },
        wallets: true,
      },
    },
    owner: true,
  }
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminDeleteWallet(userId: string, walletId: string) {
    const wallet = await this.adminWallet(userId, walletId)
    if (wallet.appEnvs?.length) {
      throw new BadRequestException(`You can't delete a wallet that has environments`)
    }
    return this.data.wallet.delete({ where: { id: walletId } })
  }

  async adminWallet(userId: string, walletId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.wallet.findUnique({
      where: { id: walletId },
      include: {
        appEnvs: this.include.appEnvs,
      },
    })
  }

  async adminWallets(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.wallet.findMany({
      include: {
        ...this.include,
        balances: {
          distinct: 'appEnvId',
          orderBy: { createdAt: 'desc' },
          include: {
            appEnv: {
              include: {
                app: true,
                cluster: true,
              },
            },
          },
        },
      },
    })
  }
}
