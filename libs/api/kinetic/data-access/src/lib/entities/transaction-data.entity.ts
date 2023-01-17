import { ApiProperty } from '@nestjs/swagger'
import { VersionedMessage } from '@solana/web3.js'

export class TransactionData {
  @ApiProperty()
  message: VersionedMessage
  @ApiProperty()
  signatures: string[]
}
