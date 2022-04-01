import { registerEnumType } from '@nestjs/graphql'
import { AppUserRole } from '@prisma/client'
export { AppUserRole }

registerEnumType(AppUserRole, { name: 'AppUserRole' })
