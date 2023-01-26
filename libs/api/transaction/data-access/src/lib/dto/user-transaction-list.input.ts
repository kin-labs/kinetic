import { Field, InputType } from '@nestjs/graphql'
import { TransactionStatus } from '../entities/transaction-status.enum'

@InputType()
export class UserTransactionListInput {
  @Field({ nullable: true })
  destination?: string
  @Field({ nullable: true })
  ip?: string
  @Field({ nullable: true })
  limit?: number
  @Field({ nullable: true })
  page?: number
  @Field({ nullable: true })
  reference?: string
  @Field({ nullable: true })
  signature?: string
  @Field({ nullable: true })
  source?: string
  @Field(() => [TransactionStatus], { nullable: true })
  status?: TransactionStatus[]
  @Field({ nullable: true })
  ua?: string
}
