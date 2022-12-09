import { ApiAccountDataAccessService } from '@kin-kinetic/api/account/data-access'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { Queue } from 'bull'
import { QueueCount } from '../../entity/queue-count.entity'
import { QueueType } from '../../entity/queue-type.enum'

@Injectable()
export class ApiQueueCloseAccountService {
  private readonly logger = new Logger(ApiQueueCloseAccountService.name)
  constructor(
    @InjectQueue(QueueType.CloseAccount) readonly queue: Queue,
    readonly account: ApiAccountDataAccessService,
    readonly data: ApiCoreDataAccessService,
  ) {
    if (!this.data.config.queueCloseAccountStart) {
      this.queue.pause().then((res) => this.logger.debug(`Queue ${QueueType.CloseAccount} is paused`))
    } else {
      this.logger.debug(`Queue ${QueueType.CloseAccount} is started`)
    }
  }

  async getQueueInfo() {
    const [isPaused, count] = await Promise.all([this.queue.isPaused(), this.queue.getJobCounts()])

    return {
      count: count as QueueCount,
      isPaused,
      name: this.queue.name,
      type: QueueType.CloseAccount,
    }
  }

  async process({
    environment,
    index,
    accounts,
    mint,
    mints,
    wallets,
  }: {
    environment: string
    index: number
    accounts: string[]
    mint: string
    mints: string[]
    wallets: string[]
  }) {
    await this.queue.addBulk(
      accounts.map((account) => {
        return {
          name: 'process',
          data: {
            account,
            environment,
            index,
            mint,
            mints,
            wallets,
          },
          opts: {
            jobId: `process-${index}-${environment}-${account}`,
          },
        }
      }),
    )
  }
}
