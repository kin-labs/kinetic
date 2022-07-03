import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { GraphQLJSON } from 'graphql-type-json'
import { AppEnv } from './app-env.entity'
import { AppTransactionError } from './app-transaction-error.entity'
import { AppTransactionStatus } from './app-transaction-status.enum'
import { AppWebhook } from './app-webhook.entity'

@ObjectType()
export class AppTransaction {
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  id?: string
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  createdAt?: Date
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date
  @ApiProperty({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  amount?: number
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  destination?: string
  @ApiProperty({
    type: [AppTransactionError],
    nullable: true,
  })
  @Field(() => [AppTransactionError], { nullable: true })
  errors?: AppTransactionError[]
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  explorerUrl?: string
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  feePayer?: string
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  mint?: string
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  referenceId?: string
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  referenceType?: string
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  signature?: string
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  solanaFinalized?: Date
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  solanaCommitted?: Date
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  solanaStart?: Date
  @ApiProperty({ nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  solanaTransaction?: any
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  source?: string
  @ApiProperty({ nullable: true })
  @Field(() => AppTransactionStatus)
  status: AppTransactionStatus
  @HideField()
  webhooks?: AppWebhook[]
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  webhookEventStart?: Date
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  webhookEventEnd?: Date
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  webhookVerifyStart?: Date
  @ApiProperty({ nullable: true })
  @Field({ nullable: true })
  webhookVerifyEnd?: Date
  @HideField()
  appEnv?: AppEnv
}
