import { registerEnumType } from '@nestjs/graphql'

export enum QueueType {
  CloseAccount = 'CloseAccount',
}

registerEnumType(QueueType, { name: 'QueueType' })

export const QueueSettings = {
  [QueueType.CloseAccount]: {
    name: 'process',
    concurrency: Number(process.env['QUEUE_CLOSE_ACCOUNT_CONCURRENCY'] || 1),
  },
}
