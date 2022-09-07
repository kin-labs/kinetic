import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TransactionCounter {
  @Field({ nullable: true })
  limit?: number
  @Field({ nullable: true })
  page?: number
  @Field({ nullable: true })
  pageCount?: number
  @Field({ nullable: true })
  total?: number
}
