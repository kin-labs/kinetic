import { registerEnumType } from '@nestjs/graphql'
import { WebhookType } from '@prisma/client'
export { WebhookType }

registerEnumType(WebhookType, { name: 'WebhookType' })
