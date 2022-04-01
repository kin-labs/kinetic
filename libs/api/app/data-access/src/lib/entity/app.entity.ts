import { Field, Int, ObjectType } from '@nestjs/graphql'

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
}
