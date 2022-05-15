import { registerEnumType } from '@nestjs/graphql'
import { ClusterType } from '@prisma/client'
export { ClusterType }

registerEnumType(ClusterType, { name: 'ClusterType' })
