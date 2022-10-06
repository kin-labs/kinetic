import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { TransactionErrorType } from './transaction-error-type.enum'

@ObjectType()
export class TransactionError {
  @ApiProperty()
  @Field({ nullable: true })
  id?: string
  @ApiProperty({ type: [String] })
  @Field(() => [String], { nullable: true })
  logs?: string[]
  @ApiProperty()
  @Field({ nullable: true })
  message?: string
  @ApiProperty({ enum: TransactionErrorType, enumName: 'TransactionErrorType' })
  @Field(() => TransactionErrorType)
  type: TransactionErrorType
  @ApiProperty({ type: 'integer' })
  @Field(() => Int, { nullable: true })
  instruction?: number
}
