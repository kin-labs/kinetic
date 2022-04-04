import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class NetworkStat {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field({ nullable: true })
  numSlots?: number
  @Field()
  numTransactions?: number
  @Field()
  samplePeriodSecs?: number
  @Field()
  slot?: number
}
