import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { AppTransactionErrorType } from './app-transaction-error-type.enum'

@ObjectType()
export class AppTransactionError {
  @ApiProperty()
  @Field({ nullable: true })
  id?: string
  @ApiProperty()
  @Field({ nullable: true })
  message?: string
  @ApiProperty()
  @Field(() => AppTransactionErrorType)
  type: AppTransactionErrorType
  @Field(() => Int, { nullable: true })
  instruction?: number
}
