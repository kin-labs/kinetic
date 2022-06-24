import { registerEnumType } from '@nestjs/graphql'
import { WalletType } from '@prisma/client'
export { WalletType }

registerEnumType(WalletType, { name: 'WalletType' })
