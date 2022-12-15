import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { AdminQueueLoadInput } from './dto/admin-queue-load.input'
import { JobStatus, JobStatusClean } from './entity/job-status.enum'
import { Job } from './entity/job.entity'
import { QueueType } from './entity/queue-type.enum'
import { Queue } from './entity/queue.entity'
import { ApiQueueCloseAccountService } from './queue/close-account/api-queue-close-account.service'

@Injectable()
export class ApiQueueDataAccessService {
  private readonly logger = new Logger(ApiQueueDataAccessService.name)
  constructor(
    private readonly data: ApiCoreDataAccessService,
    private readonly accountQueue: ApiQueueCloseAccountService,
  ) {}

  async adminQueues(): Promise<Queue[]> {
    const queues = [this.accountQueue]

    this.logger.debug(`Get info for ${queues.length} queues`)

    return Promise.all(queues.map((queue) => queue.getQueueInfo()))
  }

  async adminQueue(type: QueueType): Promise<Queue> {
    if (type === QueueType.CloseAccount) {
      return this.accountQueue.getQueueInfo()
    }

    throw new NotFoundException(`Queue ${name} not found`)
  }

  async adminQueueJobs(type: QueueType, statuses: JobStatus[]): Promise<Job[]> {
    if (type === QueueType.CloseAccount) {
      const jobs = await this.accountQueue.queue.getJobs(
        statuses.map((status) => status.toLowerCase() as JobStatus),
        0,
        1000,
      )

      return jobs.map((job) => job.toJSON() as Job)
    }

    throw new NotFoundException(`Queue ${name} not found`)
  }

  async adminQueueLoad(input: AdminQueueLoadInput): Promise<Queue> {
    if (input.type === QueueType.CloseAccount) {
      return this.loadAccountQueue(input)
    }

    throw new NotFoundException(`Queue ${input.type} not found`)
  }

  async adminQueueClean(type: QueueType, status?: JobStatus): Promise<boolean> {
    if (type === QueueType.CloseAccount) {
      if (!status) {
        await this.accountQueue.queue.obliterate()
      } else {
        await this.accountQueue.queue.clean(1000, status.toLowerCase() as JobStatusClean)
      }
      return true
    }

    throw new NotFoundException(`Queue ${name} not found`)
  }

  async adminQueueDeleteJob(type: QueueType, jobId: string) {
    if (type === QueueType.CloseAccount) {
      const job = await this.accountQueue.queue.getJob(jobId)
      await job.discard()
      await job.remove()

      return true
    }

    throw new NotFoundException(`Queue ${name} not found`)
  }

  async adminQueuePause(type: QueueType): Promise<boolean> {
    if (type === QueueType.CloseAccount) {
      await this.accountQueue.queue.pause()
      return true
    }

    throw new NotFoundException(`Queue ${name} not found`)
  }

  async adminQueueResume(type: QueueType): Promise<boolean> {
    if (type === QueueType.CloseAccount) {
      await this.accountQueue.queue.resume()
      return true
    }

    throw new NotFoundException(`Queue ${name} not found`)
  }

  async loadAccountQueue({ environment, index, payload }: AdminQueueLoadInput) {
    const appKey = getAppKey(environment, index)
    const accounts = payload
      .toString()
      .split(/\r?\n/)
      .filter((line) => line?.length > 0)
      .sort()

    const uniqueAccounts = [...new Set(accounts)]

    this.logger.debug(`Loading ${uniqueAccounts.length} accounts into ${QueueType.CloseAccount} queue in app ${appKey}`)
    const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)

    // TODO: Add support for specifying which Mint accounts to close
    // Currently, only the token account for the default Mint is closed
    const mint = appEnv.mints[0].mint?.address
    const mints = appEnv.mints.map((m) => m.mint?.address)
    const wallets = [...new Set(appEnv.wallets.map((w) => w.publicKey))]

    await this.accountQueue.process({
      environment,
      index,
      accounts: uniqueAccounts,
      mint,
      mints,
      wallets,
    })

    return this.accountQueue.getQueueInfo()
  }
}
