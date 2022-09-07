import { registerEnumType } from '@nestjs/graphql'
import { WebhookDirection } from '@prisma/client'

export { WebhookDirection }

registerEnumType(WebhookDirection, { name: 'WebhookDirection' })
