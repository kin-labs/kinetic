import { registerEnumType } from '@nestjs/graphql'

export enum QueueType {
  CloseAccount = 'CloseAccount',
}

registerEnumType(QueueType, { name: 'QueueType' })
