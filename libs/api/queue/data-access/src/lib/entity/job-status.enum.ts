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

// Internal type from Bull that's not exported
export type JobStatusClean = 'completed' | 'wait' | 'active' | 'delayed' | 'failed' | 'paused'
