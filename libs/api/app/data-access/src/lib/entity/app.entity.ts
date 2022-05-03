import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { AppUser } from './app-user.entity'

@ObjectType()
export class App {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field(() => Int)
  index: number
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  webhookEventUrl?: string
  @Field({ nullable: true })
  webhookSecret?: string
  @Field({ nullable: true })
  webhookVerifyUrl?: string
  @Field(() => [AppUser], { nullable: true })
  users: AppUser[]
  @HideField()
  wallet
}
