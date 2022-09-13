import { Logger } from '@nestjs/common'

export function getVerboseLogger(context: string) {
  const logger = new Logger(context)

  return { log: logger.verbose, error: logger.error }
}
