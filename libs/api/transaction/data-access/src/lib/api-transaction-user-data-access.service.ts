import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UserTransactionListInput } from './dto/user-transaction-list.input'
import { TransactionCounter } from './entities/transaction-counter.entity'
import { Transaction } from './entities/transaction.entity'

@Injectable()
export class ApiTransactionUserDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  private userTransactionsWhere(appEnvId: string, input: UserTransactionListInput = {}): Prisma.TransactionWhereInput {
    const { destination, ip, reference, signature, source, status, ua } = input
    return {
      appEnvId,
      destination,
      ip,
      reference,
      signature,
      source,
      status: status?.length ? { in: status } : undefined,
      ua,
    }
  }

  private userTransactionsLimit(input: UserTransactionListInput = {}) {
    const page = input.page && input.page > 0 ? input.page : 1
    const take = input.limit && input.limit > 0 ? input.limit : 10
    const skip = take * page - take
    return {
      page,
      take,
      skip: skip > 0 ? skip : 0,
    }
  }

  async userTransaction(userId: string, appId: string, appEnvId: string, transactionId: string) {
    await this.data.ensureAppUser(userId, appId)
    return this.data.transaction.findFirst({
      where: { id: transactionId, appEnvId },
      include: { errors: true, appEnv: { include: { cluster: true } }, webhooks: true },
    })
  }

  async userTransactions(userId: string, appId: string, appEnvId: string, input: UserTransactionListInput = {}) {
    await this.data.ensureAppUser(userId, appId)
    const { skip, take } = this.userTransactionsLimit(input)
    return this.data.transaction.findMany({
      include: { errors: true, appEnv: { include: { cluster: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
      where: this.userTransactionsWhere(appEnvId, input),
    })
  }

  async userTransactionCounter(
    userId: string,
    appId: string,
    appEnvId: string,
    input: UserTransactionListInput = {},
  ): Promise<TransactionCounter> {
    await this.data.ensureAppUser(userId, appId)
    const total = await this.data.transaction.count({
      where: this.userTransactionsWhere(appEnvId, input),
    })
    const { page, take } = this.userTransactionsLimit(input)
    const pageCount = Math.ceil(total / take)
    return {
      page,
      pageCount,
      limit: take,
      total,
    }
  }

  explorerUrl(tx: Transaction) {
    const { explorer } = tx.appEnv.cluster

    return explorer.replace('{path}', `/tx/${tx.signature}`)
  }
}
