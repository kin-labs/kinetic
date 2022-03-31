import { Commitment } from '@solana/web3.js'
import { ApiProperty } from '@nestjs/swagger'

export class AccountInfoRequest {
  @ApiProperty()
  commitment?: Commitment
  @ApiProperty()
  accountId: string // publicKey of the account
}
