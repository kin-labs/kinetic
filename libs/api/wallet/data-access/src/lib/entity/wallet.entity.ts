import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { WalletBalance } from './wallet-balance.entity'

@ObjectType()
export class Wallet {
  @Field()
  id: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  publicKey: string
  @Field(() => [WalletBalance], { nullable: true })
  balances?: WalletBalance[]
  @HideField()
  appEnvs?: any
}
