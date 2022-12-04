import {
  AdminQueueLoadInput,
  ApiQueueDataAccessService,
  Job,
  JobStatus,
  Queue,
  QueueType,
} from '@kin-kinetic/api/queue/data-access'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiQueueAdminFeatureResolver {
  constructor(private readonly service: ApiQueueDataAccessService) {}

  @Query(() => Queue, { nullable: true })
  adminQueue(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.adminQueue(type)
  }

  @Query(() => [Job], { nullable: true })
  adminQueueJobs(
    @Args('type', { type: () => QueueType }) type: QueueType,
    @Args('statuses', { type: () => [JobStatus] }) statuses: JobStatus[],
  ) {
    return this.service.adminQueueJobs(type, statuses)
  }

  @Mutation(() => Queue, { nullable: true })
  adminQueueLoad(@Args('input') input: AdminQueueLoadInput) {
    return this.service.adminQueueLoad(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminQueueClean(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.adminQueueClean(type)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminQueueDeleteJob(@Args('type', { type: () => QueueType }) type: QueueType, @Args('jobId') jobId: string) {
    return this.service.adminQueueDeleteJob(type, jobId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminQueuePause(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.adminQueuePause(type)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminQueueResume(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.adminQueueResume(type)
  }

  @Query(() => [Queue], { nullable: true })
  adminQueues() {
    return this.service.adminQueues()
  }
}
