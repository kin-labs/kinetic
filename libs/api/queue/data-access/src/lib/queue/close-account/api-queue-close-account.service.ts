import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Queue } from 'bull'
import { QueueCount } from '../../entity/queue-count.entity'
import { QueueOptions, QueueType } from '../../entity/queue-type.enum'

@Injectable()
export class ApiQueueCloseAccountService implements OnModuleInit {
  private readonly logger = new Logger(ApiQueueCloseAccountService.name)
  constructor(@InjectQueue(QueueType.CloseAccount) readonly queue: Queue, readonly data: ApiCoreDataAccessService) {}

  async onModuleInit(): Promise<void> {
    if (this.data.config.queueCloseAccountStart) {
      this.logger.debug(`Queue ${QueueType.CloseAccount} is started`)
    } else {
      this.queue.pause().then(() => this.logger.debug(`Queue ${QueueType.CloseAccount} is paused`))
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
    const { name } = QueueOptions[QueueType.CloseAccount]
    await this.queue.addBulk(
      accounts.map((account) => {
        return {
          name,
          data: {
            account,
            environment,
            index,
            mint,
            mints,
            wallets,
          },
          opts: {
            jobId: `${name}-${index}-${environment}-${account}`,
          },
        }
      }),
    )
  }
}
