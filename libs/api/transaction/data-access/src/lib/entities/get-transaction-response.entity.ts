import { ApiProperty } from '@nestjs/swagger'
import { RpcResponseAndContext } from './rpc-response-and-context.entity'
import { TransactionResponse } from './transaction-response.entity'

export class GetTransactionResponse {
  @ApiProperty()
  signature: string
  @ApiProperty({ type: RpcResponseAndContext })
  status: RpcResponseAndContext
  @ApiProperty({ type: TransactionResponse })
  transaction: TransactionResponse
}
