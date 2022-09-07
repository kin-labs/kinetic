import { registerEnumType } from '@nestjs/graphql'
import { TransactionStatus } from '@prisma/client'
export { TransactionStatus }

registerEnumType(TransactionStatus, { name: 'TransactionStatus' })
