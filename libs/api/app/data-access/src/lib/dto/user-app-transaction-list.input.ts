import { Field, InputType } from '@nestjs/graphql'
import { AppTransactionStatus } from '../entity/app-transaction-status.enum'

@InputType()
export class UserAppTransactionListInput {
  @Field({ nullable: true })
  destination?: string
  @Field({ nullable: true })
  ip?: string
  @Field({ nullable: true })
  limit?: number
  @Field({ nullable: true })
  page?: number
  @Field({ nullable: true })
  referenceId?: string
  @Field({ nullable: true })
  referenceType?: string
  @Field({ nullable: true })
  signature?: string
  @Field({ nullable: true })
  source?: string
  @Field(() => [AppTransactionStatus], { nullable: true })
  status?: AppTransactionStatus[]
  @Field({ nullable: true })
  ua?: string
}
