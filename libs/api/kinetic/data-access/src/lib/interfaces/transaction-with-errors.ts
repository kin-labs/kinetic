import { Transaction, TransactionError } from '@prisma/client'

export type TransactionWithErrors = Transaction & { errors: TransactionError[] }
