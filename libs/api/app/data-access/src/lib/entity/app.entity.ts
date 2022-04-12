import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { AppEnv } from './app-env.entity'
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
  @Field(() => [AppEnv], { nullable: true })
  envs: AppEnv[]
  @Field(() => [AppUser], { nullable: true })
  users: AppUser[]
  @HideField()
  wallet
}
