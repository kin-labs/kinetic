import { registerEnumType } from '@nestjs/graphql'
import { AppWebhookDirection } from '@prisma/client'
export { AppWebhookDirection }

registerEnumType(AppWebhookDirection, { name: 'AppWebhookDirection' })
