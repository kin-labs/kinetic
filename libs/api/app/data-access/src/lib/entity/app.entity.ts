import { Field, Int, ObjectType } from '@nestjs/graphql'
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
  @Field(() => [AppEnv], { nullable: true })
  envs?: AppEnv[]
  @Field(() => Int)
  index: number
  @Field({ nullable: true })
  logoUrl: string
  @Field(() => Int)
  maxEnvs: number
  @Field({ nullable: true })
  name: string
  @Field(() => [AppUser], { nullable: true })
  users?: AppUser[]
}
