import { registerEnumType } from '@nestjs/graphql'
import { AppPaymentStatus } from '@prisma/client'
export { AppPaymentStatus }

registerEnumType(AppPaymentStatus, { name: 'AppPaymentStatus' })
