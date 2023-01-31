import { Field, ObjectType } from '@nestjs/graphql'
import { MigrationStatus } from './migration-status.entity'

@ObjectType()
export class Migration {
  @Field()
  key: string

  @Field()
  version: string

  @Field(() => MigrationStatus)
  status: MigrationStatus
}
