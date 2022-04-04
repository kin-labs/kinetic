import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { User } from '@mogami/api/user/data-access'
import { ApiWalletDataAccessService, Wallet } from '@mogami/api/wallet/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiWalletFeatureResolver {
  constructor(private readonly service: ApiWalletDataAccessService) {}

  @Mutation(() => Wallet, { nullable: true })
  generateWallet(@CtxUser() user: User) {
    return this.service.generateWallet(user.id)
  }

  @Mutation(() => Wallet, { nullable: true })
  deleteWallet(@CtxUser() user: User, @Args('walletId') walletId: string) {
    return this.service.deleteWallet(user.id, walletId)
  }

  @Query(() => Wallet, { nullable: true })
  wallet(@CtxUser() user: User, @Args('walletId') walletId: string) {
    return this.service.wallet(user.id, walletId)
  }

  @Query(() => [Wallet], { nullable: true })
  wallets(@CtxUser() user: User) {
    return this.service.wallets(user.id)
  }
}
