import { ApiProperty } from '@nestjs/swagger'

interface AccountInfo {
  id: string // publicKey
  balance: string
  owner: string // publicKey
  closeAuthority: string // publicKey
}

enum CreateAccountResultStatus {
  ok = 'ok',
  exists = 'exists',
  // Indicates that the service will not subsidize the transaction, and that
  // the caller should fund the transaction themselves.
  payerRequired = 'payerRequired',
  // Indicates the nonce/blockhash used in the transaction is invalid, and should
  // be refetched
  badNonce = 'badNonce',
}

export class CreateAccountResponse {
  @ApiProperty()
  account?: AccountInfo
  @ApiProperty()
  signature?: string
  @ApiProperty()
  status?: CreateAccountResultStatus
}
