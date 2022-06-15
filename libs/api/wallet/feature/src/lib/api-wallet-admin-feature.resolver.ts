import { AppEnv } from '@kin-kinetic/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { ApiWalletAdminDataAccessService, Wallet, WalletBalance } from '@kin-kinetic/api/wallet/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Wallet)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiWalletAdminFeatureResolver {
  constructor(private readonly service: ApiWalletAdminDataAccessService) {}

  @Mutation(() => Wallet, { nullable: true })
  adminDeleteWallet(@CtxUser() user: User, @Args('walletId') walletId: string) {
    return this.service.adminDeleteWallet(user.id, walletId)
  }

  @Query(() => [Wallet], { nullable: true })
  adminWallets(@CtxUser() user: Wallet) {
    return this.service.adminWallets(user.id)
  }

  @Query(() => Wallet, { nullable: true })
  adminWallet(@CtxUser() user: User, @Args('walletId') walletId: string) {
    return this.service.adminWallet(user.id, walletId)
  }

  @Query(() => [WalletBalance], { nullable: true })
  adminWalletBalances(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('walletId') walletId: string) {
    return this.service.adminWalletBalances(user.id, appEnvId, walletId)
  }

  @ResolveField(() => [AppEnv], { nullable: true })
  appEnvs(@Parent() wallet: Wallet) {
    return wallet.appEnvs
  }
}
