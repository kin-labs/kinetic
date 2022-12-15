import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminAppCreateInput {
  @Field({ nullable: true })
  enableWebhooks?: boolean

  @Field(() => Int)
  index: number

  @Field({ nullable: true })
  logoUrl?: string

  @Field()
  name: string

  @Field({ nullable: true })
  skipWalletCreation?: boolean
}
