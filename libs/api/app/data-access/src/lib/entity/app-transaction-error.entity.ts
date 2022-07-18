import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { AppTransactionErrorType } from './app-transaction-error-type.enum'

@ObjectType()
export class AppTransactionError {
  @ApiProperty()
  @Field({ nullable: true })
  id?: string
  @ApiProperty({ type: [String] })
  @Field(() => [String], { nullable: true })
  logs?: string[]
  @ApiProperty()
  @Field({ nullable: true })
  message?: string
  @ApiProperty({ enum: AppTransactionErrorType })
  @Field(() => AppTransactionErrorType)
  type: AppTransactionErrorType
  @ApiProperty({ type: 'integer' })
  @Field(() => Int, { nullable: true })
  instruction?: number
}
