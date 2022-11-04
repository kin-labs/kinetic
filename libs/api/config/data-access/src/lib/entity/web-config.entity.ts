import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class WebConfig {
  @Field()
  discordEnabled: boolean
  @Field()
  githubEnabled: boolean
  @Field()
  googleEnabled: boolean
  @Field()
  passwordEnabled: boolean
}
