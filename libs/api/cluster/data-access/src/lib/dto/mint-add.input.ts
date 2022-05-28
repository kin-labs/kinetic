import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class MintAddInput {
  @Field()
  address: string
  @Field()
  name: string
  @Field()
  symbol: string
  @Field()
  clusterId: string
}
