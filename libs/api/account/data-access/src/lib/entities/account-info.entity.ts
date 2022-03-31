import { AccountInfo } from '@solana/web3.js'
import { ApiProperty } from '@nestjs/swagger'

enum AccountInfoResponseResult {
  notFound = 'notFound',
  ok = 'ok',
}
export class AccountInfoResponse {
  @ApiProperty()
  account?: AccountInfo<string>
  @ApiProperty()
  result: AccountInfoResponseResult
}
