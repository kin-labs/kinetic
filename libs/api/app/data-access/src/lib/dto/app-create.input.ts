import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AppCreateInput {
  @Field(() => Int)
  index: number

  @Field()
  name: string

  @Field({ nullable: true })
  skipWalletCreation?: boolean
}
