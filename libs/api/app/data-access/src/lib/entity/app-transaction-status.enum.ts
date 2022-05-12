import { registerEnumType } from '@nestjs/graphql'
import { AppTransactionStatus } from '@prisma/client'
export { AppTransactionStatus }

registerEnumType(AppTransactionStatus, { name: 'AppTransactionStatus' })
