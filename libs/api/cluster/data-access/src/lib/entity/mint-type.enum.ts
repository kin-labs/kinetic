import { registerEnumType } from '@nestjs/graphql'
import { MintType } from '@prisma/client'
export { MintType }

registerEnumType(MintType, { name: 'MintType' })
