import { Field, ObjectType } from '@nestjs/graphql'
import { AppEnvTransactionCount } from './app-env-transaction-count.entity'

@ObjectType()
export class AppEnvStats {
  @Field(() => AppEnvTransactionCount, { nullable: true })
  transactionCount?: AppEnvTransactionCount
}
