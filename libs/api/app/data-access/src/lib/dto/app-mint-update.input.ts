import { Field, InputType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class AppMintUpdateInput {
  @IsOptional()
  @Field({ nullable: true })
  addMemo?: boolean
}
