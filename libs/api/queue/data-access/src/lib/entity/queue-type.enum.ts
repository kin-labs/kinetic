import { ProcessOptions } from '@nestjs/bull'
import { registerEnumType } from '@nestjs/graphql'

export enum QueueType {
  CloseAccount = 'CloseAccount',
}

registerEnumType(QueueType, { name: 'QueueType' })

export const QueueOptions: Record<QueueType, ProcessOptions> = {
  [QueueType.CloseAccount]: {
    name: QueueType.CloseAccount,
    concurrency: Number(process.env['QUEUE_CLOSE_ACCOUNT_CONCURRENCY'] || 1),
  },
}
