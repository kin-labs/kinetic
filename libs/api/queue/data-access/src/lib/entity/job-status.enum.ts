import { registerEnumType } from '@nestjs/graphql'

export enum JobStatus {
  completed = 'completed',
  waiting = 'waiting',
  active = 'active',
  delayed = 'delayed',
  failed = 'failed',
  paused = 'paused',
}

registerEnumType(JobStatus, { name: 'JobStatus' })
