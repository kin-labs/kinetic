import { ApiProperty } from '@nestjs/swagger'
import { Message } from '@solana/web3.js'

export class TransactionData {
  @ApiProperty()
  message: Message
  @ApiProperty()
  signatures: string[]
}
