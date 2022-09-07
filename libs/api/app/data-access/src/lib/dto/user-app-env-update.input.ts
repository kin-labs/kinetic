import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsUrl } from 'class-validator'

@InputType()
export class UserAppEnvUpdateInput {
  @IsOptional()
  @Field({ nullable: true })
  webhookBalanceEnabled?: boolean
  @IsOptional()
  @Field({ nullable: true })
  webhookBalanceUrl?: string
  @IsOptional()
  @Field({ nullable: true })
  webhookBalanceTreshold?: number
  @IsOptional()
  @Field({ nullable: true })
  webhookDebugging?: boolean
  @IsOptional()
  @Field({ nullable: true })
  webhookEventEnabled?: boolean
  @IsOptional()
  @IsUrl({}, { message: 'webhookEventUrl must be a url' })
  @Field({ nullable: true })
  webhookEventUrl?: string
  @IsOptional()
  @Field({ nullable: true })
  webhookSecret?: string
  @IsOptional()
  @Field({ nullable: true })
  webhookVerifyEnabled?: boolean
  @IsOptional()
  @IsUrl(undefined, { message: 'webhookVerifyUrl must be a url' })
  @Field({ nullable: true })
  webhookVerifyUrl?: string
}
