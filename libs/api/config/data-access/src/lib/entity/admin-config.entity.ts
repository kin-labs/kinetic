import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AdminConfig {
  @Field()
  githubEnabled: boolean
  @Field()
  passwordEnabled: boolean
}
