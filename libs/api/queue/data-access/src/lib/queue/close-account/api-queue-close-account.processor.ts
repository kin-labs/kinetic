import { validateCloseAccount } from '@kin-kinetic/api/account/data-access'
import { Commitment } from '@kin-kinetic/solana'
import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { DoneCallback, Job } from 'bull'
import { QueueType } from '../../entity/queue-type.enum'
import { ApiQueueCloseAccountService } from './api-queue-close-account.service'

@Processor(QueueType.CloseAccount)
export class ApiQueueCloseAccountProcessor {
  private readonly logger = new Logger(ApiQueueCloseAccountProcessor.name)

  constructor(private readonly service: ApiQueueCloseAccountService) {}

  @Process({ name: 'process' })
  async handleProcess(job: Job, cb: DoneCallback) {
    const { account, environment, index, mint, mints, wallets } = job.data

    this.logger.debug(`${job.id} Waiting 1 seconds...`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    this.logger.debug(`${job.id} Start processing...`)

    try {
      const accountInfo = await this.service.account.getAccountInfo(environment, index, account)

      try {
        validateCloseAccount({ info: accountInfo, mint, mints, wallets })

        this.logger.debug(
          `${job.id} Account can close! ${JSON.stringify({ info: accountInfo, mint, mints, wallets }, null, 2)}`,
        )

        const { appEnv, appKey } = await this.service.data.getAppEnvironment(environment, index)

        const transaction = await this.service.account.handleCloseAccount(
          {
            commitment: Commitment.Confirmed,
            mint,
            referenceId: `${job.id}`,
            referenceType: QueueType.CloseAccount,
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
