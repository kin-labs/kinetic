import { registerEnumType } from '@nestjs/graphql'
import { TransactionErrorType } from '@prisma/client'
export { TransactionErrorType }

registerEnumType(TransactionErrorType, { name: 'TransactionErrorType' })
