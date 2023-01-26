import { getAppKey } from '@kin-kinetic/api/core/util'
import { ApiKineticService, validateCloseAccount } from '@kin-kinetic/api/kinetic/data-access'
import { Commitment } from '@kin-kinetic/solana'
import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { DoneCallback, Job } from 'bull'
import { QueueOptions, QueueType } from '../../entity/queue-type.enum'
import { ApiQueueCloseAccountService } from './api-queue-close-account.service'

@Processor(QueueType.CloseAccount)
export class ApiQueueCloseAccountProcessor {
  private readonly logger = new Logger(ApiQueueCloseAccountProcessor.name)

  constructor(private readonly kinetic: ApiKineticService, private readonly service: ApiQueueCloseAccountService) {}

  @Process(QueueOptions[QueueType.CloseAccount])
  async handleProcess(job: Job, cb: DoneCallback) {
    const { account, environment, index, mint, mints, wallets } = job.data

    this.logger.debug(`${job.id} Start processing...`)
    const commitment = Commitment.Finalized

    try {
      const appKey = getAppKey(environment, index)
      const accountInfo = await this.kinetic.getAccountInfo(appKey, account, mint, commitment)

      try {
        validateCloseAccount({ info: accountInfo, mint, mints, wallets })

        this.logger.debug(
          `${job.id} Account can close! ${JSON.stringify({ info: accountInfo, mint, mints, wallets }, null, 2)}`,
        )

        const appEnv = await this.service.data.getAppEnvironmentByAppKey(appKey)
        const transaction = await this.kinetic.handleCloseAccount(
          {
            commitment,
            mint,
            reference: `CloseAccount:${job.id}`,
            environment,
            index,
            account,
          },
          { appKey, appEnv },
        )

        await job.update({ ...job.data, message: `${job.id} Account closed!`, info: accountInfo, transaction })
        // Sleep for half a second to allow the transaction to be processed
        return cb(null, `${job.id} Account closed!`)
      } catch (err) {
        const error = `Cannot close account: ${err.message}`
        this.logger.verbose(`${job.id} ${error}`)
        await job.update({ ...job.data, error, info: accountInfo })
        return cb(new Error(error))
      }
    } catch (err) {
      const error = `Cannot get account info: ${err.message}`
      this.logger.verbose(`${job.id} ${error}`)
      await job.update({ ...job.data, error })
      return cb(new Error(error))
    }
  }
}
