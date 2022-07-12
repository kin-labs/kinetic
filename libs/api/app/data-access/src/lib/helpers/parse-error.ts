import { Prisma } from '@prisma/client'
import { AppTransactionErrorType } from '../entity/app-transaction-error-type.enum'

export function parseError(
  error,
  errorType?: string,
  instruction?: number,
): Prisma.AppTransactionErrorCreateWithoutAppTransactionInput {
  const message = error.toString()
  let type: AppTransactionErrorType = AppTransactionErrorType.Unknown

  if (errorType === 'InvalidAccountData') {
    type = AppTransactionErrorType.InvalidAccount
  }

  return {
    logs: error.logs,
    message,
    instruction,
    type,
  }
}
