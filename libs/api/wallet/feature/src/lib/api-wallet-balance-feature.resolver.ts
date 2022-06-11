import { AppEnv } from '@mogami/api/app/data-access'
import { WalletBalance } from '@mogami/api/wallet/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => WalletBalance)
export class ApiWalletBalanceFeatureResolver {
  @ResolveField(() => AppEnv, { nullable: true })
  appEnv(@Parent() wallet: WalletBalance) {
    return wallet.appEnv
  }
}
