import { ApiProperty } from '@nestjs/swagger'
import { RpcResponseAndContext } from './rpc-response-and-context.entity'
import { SignatureStatus } from './signature-status.entity'
import { TransactionResponse } from './transaction-response.entity'

export class GetTransactionResponse {
  @ApiProperty()
  signature: string
  @ApiProperty({ type: SignatureStatus })
  status: RpcResponseAndContext<SignatureStatus>
  @ApiProperty({ type: TransactionResponse })
  transaction: TransactionResponse
}
