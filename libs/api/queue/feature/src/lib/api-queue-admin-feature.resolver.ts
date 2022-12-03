import { ApiQueueDataAccessService } from '@kin-kinetic/api/queue/data-access'
import { Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiQueueFeatureResolver {
  constructor(private readonly service: ApiQueueDataAccessService) {}
}
