import { Cluster } from '@kin-kinetic/api/cluster/data-access'
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { AppMint } from './app-mint.entity'
import { App } from './app.entity'

@ObjectType()
export class AppEnv {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field({ nullable: true })
  name: string
  @Field(() => [String], { nullable: true })
  ipsAllowed?: string[]
  @Field(() => [String], { nullable: true })
  ipsBlocked?: string[]
  @Field(() => Int, { nullable: true })
  solanaTransactionMaxRetries?: number
  @Field({ nullable: true })
  solanaTransactionSkipPreflight: boolean
  @Field(() => [String], { nullable: true })
  uasAllowed?: string[]
  @Field(() => [String], { nullable: true })
  uasBlocked?: string[]
  @Field({ nullable: true })
  webhookBalanceEnabled?: boolean
  @Field({ nullable: true })
  webhookBalanceUrl?: string
  @Field({ nullable: true })
  webhookBalanceThreshold?: string
  @Field({ nullable: true })
  webhookDebugging?: boolean
  @Field({ nullable: true })
  webhookEventEnabled?: boolean
  @Field({ nullable: true })
  webhookEventUrl?: string
  @Field({ nullable: true })
  webhookSecret?: string
  @Field({ nullable: true })
  webhookVerifyEnabled?: boolean
  @Field({ nullable: true })
  webhookVerifyUrl?: string
  @Field(() => Cluster, { nullable: true })
  cluster?: Cluster
  @Field(() => [AppMint], { nullable: true })
  mints: AppMint[]
  @Field(() => App, { nullable: true })
  app: App
  @HideField()
  wallets
}
