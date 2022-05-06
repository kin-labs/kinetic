import { registerEnumType } from '@nestjs/graphql'
import { AppCreationStatus } from '@prisma/client'
export { AppCreationStatus }

registerEnumType(AppCreationStatus, { name: 'AppCreationStatus' })
