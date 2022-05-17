import { registerEnumType } from '@nestjs/graphql'
import { ClusterStatus } from '@prisma/client'
export { ClusterStatus }

registerEnumType(ClusterStatus, { name: 'ClusterStatus' })
