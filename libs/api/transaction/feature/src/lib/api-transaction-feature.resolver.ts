import { Transaction, TransactionCounter, UserTransactionListInput } from '@kin-kinetic/api/transaction/data-access'
import { CtxUser } from '@kin-kinetic/api/auth/data-access'
import { ApiTransactionUserDataAccessService } from '@kin-kinetic/api/transaction/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Transaction)
export class ApiTransactionFeatureResolver {
  constructor(private readonly service: ApiTransactionUserDataAccessService) {}

  @Query(() => Transaction, { nullable: true })
  userTransaction(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('transactionId') transactionId: string,
  ) {
    return this.service.userTransaction(user.id, appId, appEnvId, transactionId)
  }

  @Query(() => [Transaction], { nullable: true })
  userTransactions(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args({ name: 'input', type: () => UserTransactionListInput, nullable: true })
    input: UserTransactionListInput,
  ) {
    return this.service.userTransactions(user.id, appId, appEnvId, input)
  }

  @Query(() => TransactionCounter, { nullable: true })
  userTransactionCounter(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args({ name: 'input', type: () => UserTransactionListInput, nullable: true })
    input: UserTransactionListInput,
  ) {
    return this.service.userTransactionCounter(user.id, appId, appEnvId, input)
  }

  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() tx: Transaction) {
    return this.service.explorerUrl(tx)
  }
}
