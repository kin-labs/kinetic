import { registerEnumType } from '@nestjs/graphql'
import { AppWebhookType } from '@prisma/client'
export { AppWebhookType }

registerEnumType(AppWebhookType, { name: 'AppWebhookType' })
