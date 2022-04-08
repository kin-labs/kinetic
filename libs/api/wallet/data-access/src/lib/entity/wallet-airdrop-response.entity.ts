import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class WalletAirdropResponse {
  @Field({ nullable: true })
  signature?: string
}
