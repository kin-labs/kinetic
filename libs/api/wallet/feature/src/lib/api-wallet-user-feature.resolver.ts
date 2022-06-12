import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { User } from '@mogami/api/user/data-access'
import {
  ApiWalletUserDataAccessService,
  Wallet,
  WalletAirdropResponse,
  WalletBalance,
} from '@mogami/api/wallet/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Float, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiWalletUserFeatureResolver {
  constructor(private readonly service: ApiWalletUserDataAccessService) {}

  @Mutation(() => Wallet, { nullable: true })
  userGenerateWallet(@CtxUser() user: User, @Args({ name: 'index', type: () => Int }) index: number) {
    return this.service.userGenerateWallet(user.id, index)
  }

  @Mutation(() => Wallet, { nullable: true })
  userDeleteWallet(@CtxUser() user: User, @Args('walletId') walletId: string) {
    return this.service.userDeleteWallet(user.id, walletId)
  }

  @Query(() => Wallet, { nullable: true })
  userWallet(@CtxUser() user: User, @Args('walletId') walletId: string) {
    return this.service.userWallet(user.id, walletId)
  }

  @Query(() => WalletAirdropResponse, { nullable: true })
  userWalletAirdrop(
    @CtxUser() user: User,
    @Args('appEnvId') appEnvId: string,
    @Args('walletId') walletId: string,
    @Args({ name: 'amount', type: () => Float }) amount: number,
  ) {
    return this.service.userWalletAirdrop(user.id, appEnvId, walletId, amount)
  }

  @Query(() => WalletBalance, { nullable: true })
  userWalletBalance(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('walletId') walletId: string) {
    return this.service.userWalletBalance(user.id, appEnvId, walletId)
  }

  @Query(() => [WalletBalance], { nullable: true })
  userWalletBalances(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('walletId') walletId: string) {
    return this.service.userWalletBalances(user.id, appEnvId, walletId)
  }

  @Query(() => [Wallet], { nullable: true })
  userWallets(@CtxUser() user: User) {
    return this.service.userWallets(user.id)
  }
}
