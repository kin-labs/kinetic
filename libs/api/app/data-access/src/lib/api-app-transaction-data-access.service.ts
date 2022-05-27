import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { AppTransaction, AppTransactionStatus } from '@prisma/client'

@Injectable()
export class ApiAppTransactionDataAccess {
  private readonly logger = new Logger(ApiAppTransactionDataAccess.name)
  private confirming = new Map<string, AppTransaction>()
  constructor(private readonly data: ApiCoreDataAccessService) {
    this.data.$use(async (params, next) => {
      const result: AppTransaction = await next(params)

      if (
        params.model !== 'AppTransaction' ||
        !result.signature ||
        result?.solanaFinalized ||
        this.confirming.has(result.id)
      ) {
        return result
      }
      this.confirmTransaction(result)

      return result
    })
  }

  async confirmTransaction(tx: AppTransaction) {
    this.confirming.set(tx.id, tx)
    this.logger.verbose(`confirmTransaction: ${tx.signature}`)
    try {
      await this.data.solana.confirmTransaction(tx.signature)
      this.logger.verbose(`confirmTransaction: ${tx.signature} done`)
      const solanaTransaction = await this.data.solana.connection.getParsedTransaction(tx.signature)
      await this.data.appTransaction.update({
        where: { id: tx.id },
        data: {
          solanaFinalized: new Date(),
          solanaTransaction: JSON.parse(JSON.stringify(solanaTransaction)),
          status: AppTransactionStatus.Finalized,
        },
        include: { errors: true },
      })
      this.confirming.delete(tx.id)
    } catch (error) {
      this.logger.error(`confirmTransaction: ${tx.signature} error: ${error.toString()}`)
      this.confirming.delete(tx.id)
    }
  }
}
