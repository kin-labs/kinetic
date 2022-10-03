import { registerEnumType } from '@nestjs/graphql'
import { UserIdentityType } from '@prisma/client'
export { UserIdentityType }

registerEnumType(UserIdentityType, { name: 'UserIdentityType' })
