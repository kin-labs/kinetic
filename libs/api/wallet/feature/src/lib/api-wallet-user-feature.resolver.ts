import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { ApiWalletUserDataAccessService, Wallet, WalletAirdropResponse } from '@kin-kinetic/api/wallet/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiWalletUserFeatureResolver {
  constructor(private readonly service: ApiWalletUserDataAccessService) {}

  @Mutation(() => Wallet, { nullable: true })
  userGenerateWallet(@CtxUser() user: User, @Args('appEnvId') appEnvId: string) {
    return this.service.userGenerateWallet(user.id, appEnvId)
  }

  @Mutation(() => Wallet, { nullable: true })
  userImportWallet(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('secret') secret: string) {
    return this.service.userImportWallet(user.id, appEnvId, secret)
  }

  @Mutation(() => Wallet, { nullable: true })
  userDeleteWallet(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('walletId') walletId: string) {
    return this.service.userDeleteWallet(user.id, appEnvId, walletId)
  }

  @Query(() => Wallet, { nullable: true })
  userWallet(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('walletId') walletId: string) {
    return this.service.userWallet(user.id, appEnvId, walletId)
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

  @Query(() => String, { nullable: true })
  userWalletBalance(@CtxUser() user: User, @Args('appEnvId') appEnvId: string, @Args('walletId') walletId: string) {
    return this.service.userWalletBalance(user.id, appEnvId, walletId)
  }

  @Query(() => [Wallet], { nullable: true })
  userWallets(@CtxUser() user: User, @Args('appEnvId') appEnvId: string) {
    return this.service.userWallets(user.id, appEnvId)
  }
}
