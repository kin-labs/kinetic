import { ApiProperty } from '@nestjs/swagger'
import { RpcResponseAndContext, SignatureStatus, TransactionResponse } from '@solana/web3.js'

export class GetTransactionResponse {
  @ApiProperty()
  signature: string
  @ApiProperty({ type: 'SignatureStatus' })
  status: RpcResponseAndContext<SignatureStatus>
  @ApiProperty({ type: 'TransactionResponse' })
  transaction: TransactionResponse
}
