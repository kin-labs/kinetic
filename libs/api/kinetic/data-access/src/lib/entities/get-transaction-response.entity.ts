import { ApiProperty } from '@nestjs/swagger'
import { SignatureStatus } from './signature-status.entity'
import { TransactionResponse } from './transaction-response.entity'

export class GetTransactionResponse {
  @ApiProperty()
  signature: string
  @ApiProperty({ type: SignatureStatus })
  status: SignatureStatus
  @ApiProperty({ type: TransactionResponse })
  transaction: TransactionResponse
}
