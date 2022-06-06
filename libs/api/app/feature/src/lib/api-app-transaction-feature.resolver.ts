import { ApiAppDataAccessService, AppTransaction, AppTransactionListInput } from '@mogami/api/app/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@mogami/api/auth/data-access'
import { User } from '@mogami/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => AppTransaction)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAppTransactionFeatureResolver {
  constructor(private readonly service: ApiAppDataAccessService) {}

  @Query(() => AppTransaction, { nullable: true })
  appTransaction(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args('appTransactionId') appTransactionId: string,
  ) {
    return this.service.appTransaction(user.id, appId, appEnvId, appTransactionId)
  }

  @Query(() => [AppTransaction], { nullable: true })
  appTransactions(
    @CtxUser() user: User,
    @Args('appId') appId: string,
    @Args('appEnvId') appEnvId: string,
    @Args({ name: 'input', type: () => AppTransactionListInput, nullable: true }) input: AppTransactionListInput,
  ) {
    return this.service.appTransactions(user.id, appId, appEnvId, input)
  }

  @ResolveField(() => Int, { nullable: true })
  processingDuration(@Parent() tx: AppTransaction) {
    if (!tx.createdAt || !tx.solanaStart) return null
    return tx?.solanaStart?.getTime() - tx?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  solanaCommittedDuration(@Parent() tx: AppTransaction) {
    if (!tx.solanaCommitted || !tx.solanaStart) return null
    return tx?.solanaCommitted?.getTime() - tx?.solanaStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  solanaFinalizedDuration(@Parent() tx: AppTransaction) {
    if (!tx.solanaFinalized || !tx.solanaStart) return null
    return tx?.solanaFinalized?.getTime() - tx?.solanaStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  totalDuration(@Parent() tx: AppTransaction) {
    return tx?.solanaFinalized?.getTime() - tx?.createdAt?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  webhookEventDuration(@Parent() tx: AppTransaction) {
    if (!tx.webhookEventEnd || !tx.webhookEventStart) return null
    return tx?.webhookEventEnd?.getTime() - tx?.webhookEventStart?.getTime()
  }

  @ResolveField(() => Int, { nullable: true })
  webhookVerifyDuration(@Parent() tx: AppTransaction) {
    if (!tx.webhookVerifyEnd || !tx.webhookVerifyStart) return null
    return tx?.webhookVerifyEnd?.getTime() - tx?.webhookVerifyStart?.getTime()
  }
}
