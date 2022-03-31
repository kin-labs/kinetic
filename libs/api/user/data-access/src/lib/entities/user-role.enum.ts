import { registerEnumType } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'
export { UserRole }

registerEnumType(UserRole, { name: 'UserRole' })
