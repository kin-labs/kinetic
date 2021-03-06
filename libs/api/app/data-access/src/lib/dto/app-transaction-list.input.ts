import { Field, InputType } from '@nestjs/graphql'
import { AppTransactionStatus } from '../entity/app-transaction-status.enum'

@InputType()
export class AppTransactionListInput {
  destination?: string
  @Field({ nullable: true })
  referenceId?: string
  @Field({ nullable: true })
  referenceType?: string
  @Field({ nullable: true })
  signature?: string
  @Field({ nullable: true })
  source?: string
  @Field(() => AppTransactionStatus, { nullable: true })
  status?: AppTransactionStatus
}
