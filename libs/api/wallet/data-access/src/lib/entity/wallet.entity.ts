import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { WalletBalance } from './wallet-balance.entity'
import { WalletType } from './wallet-type.enum'

@ObjectType()
export class Wallet {
  @Field()
  id: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => WalletType, { nullable: true })
  type: WalletType
  @Field({ nullable: true })
  publicKey: string
  @Field(() => [WalletBalance], { nullable: true })
  balances?: WalletBalance[]
  @HideField()
  appEnvs?: unknown[]
  @HideField()
  appMints?: unknown[]
  @HideField()
  owner?: unknown
}
