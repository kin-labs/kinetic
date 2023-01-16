import { Prisma, TransactionErrorType } from '@prisma/client'

export function parseTransactionError(
  error,
  errorType?: string,
  instruction?: number,
): Prisma.TransactionErrorCreateWithoutTransactionInput {
  const message = error?.toString()
  let type: TransactionErrorType = TransactionErrorType.Unknown

  if (errorType === 'InvalidAccountData') {
    type = TransactionErrorType.InvalidAccount
  }

  return {
    logs: error?.logs,
    message: message || ' ** NO ERROR MESSAGE ** ',
    instruction,
    type,
  }
}
