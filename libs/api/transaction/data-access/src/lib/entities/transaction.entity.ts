import { AppEnv } from '@kin-kinetic/api/app/data-access'
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { GraphQLJSON } from 'graphql-scalars'
import { TransactionError } from './transaction-error.entity'
import { TransactionStatus } from './transaction-status.enum'

@ObjectType()
export class Transaction {
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  id?: string
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  createdAt?: Date
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  updatedAt?: Date
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  amount?: string
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  decimals?: number
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  destination?: string
  @ApiProperty({ type: [TransactionError], nullable: true, required: false })
  @Field(() => [TransactionError], { nullable: true })
  errors?: TransactionError[]
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  explorerUrl?: string
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  feePayer?: string
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  ip?: string
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  mint?: string
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  processingDuration?: number
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  reference?: string
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  signature?: string
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  solanaCommitted?: Date
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  solanaCommittedDuration?: number
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  solanaFinalized?: Date
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  solanaFinalizedDuration?: number
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  solanaStart?: Date
  @ApiProperty({ nullable: true, required: false })
  @Field(() => GraphQLJSON, { nullable: true })
  solanaTransaction?: unknown
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  source?: string
  @ApiProperty({ nullable: true, required: false, enum: TransactionStatus, enumName: 'TransactionStatus' })
  @Field(() => TransactionStatus)
  status: TransactionStatus
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  totalDuration?: number
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  tx?: string
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  ua?: string
  @HideField()
  webhooks?: unknown[]
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  webhookEventStart?: Date
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  webhookEventEnd?: Date
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  webhookEventDuration?: number
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  webhookVerifyStart?: Date
  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  webhookVerifyEnd?: Date
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  webhookVerifyDuration?: number
  @HideField()
  appEnv?: AppEnv
}
