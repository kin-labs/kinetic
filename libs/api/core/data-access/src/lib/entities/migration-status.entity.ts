import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MigrationStatus {
  @Field(() => Int)
  count: number
  @Field()
  done: boolean
}
