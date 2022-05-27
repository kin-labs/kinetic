import { Prisma } from '@prisma/client'
import { AppTransactionErrorType } from '../entity/app-transaction-error-type.enum'

export function parseError(
  error,
  errorType: AppTransactionErrorType = AppTransactionErrorType.Unknown,
): Prisma.AppTransactionErrorCreateWithoutAppTransactionInput {
  const message = error.toString()
  let type = errorType
  let instruction

  if (message.includes('invalid account data for instruction')) {
    instruction = message.split(' ')[11]
    type = AppTransactionErrorType.InvalidAccount
  }

  // Add other cases

  return {
    message,
    instruction,
    type,
  }
}
