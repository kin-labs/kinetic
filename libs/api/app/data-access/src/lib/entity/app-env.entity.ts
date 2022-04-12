import { Field, ObjectType } from '@nestjs/graphql'
import { AppDomain } from './app-domain.entity'

@ObjectType()
export class AppEnv {
  @Field()
  id?: string
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
  @Field()
  name?: string
  @Field(() => [AppDomain], { nullable: true })
  domains: AppDomain[]
}
