import { AppTransactionErrorType } from '@prisma/client'

export function parseError(error, errorType: AppTransactionErrorType = AppTransactionErrorType.Unknown) {
  const description = error.toString()
  let type = errorType
  let instruction

  if (description.includes('invalid account data for instruction')) {
    instruction = description.split(' ')[11]
    type = AppTransactionErrorType.InvalidAccount
  }

  // Add other cases

  return {
    description,
    instruction,
    type,
  }
}
