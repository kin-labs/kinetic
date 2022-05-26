import { registerEnumType } from '@nestjs/graphql'
import { AppTransactionErrorType } from '@prisma/client'
export { AppTransactionErrorType }

registerEnumType(AppTransactionErrorType, { name: 'AppTransactionErrorType' })
