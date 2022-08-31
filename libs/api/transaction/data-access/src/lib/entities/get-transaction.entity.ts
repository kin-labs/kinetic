import { ApiProperty } from '@nestjs/swagger'
import {
  Message,
  RpcResponseAndContext,
  TokenBalance,
  TransactionConfirmationStatus,
  TransactionError,
} from '@solana/web3.js'

export class SignatureStatus {
  @ApiProperty()
  slot: number
  @ApiProperty()
  confirmations: number | null
  @ApiProperty()
  err: TransactionError | null
  @ApiProperty()
  confirmationStatus?: TransactionConfirmationStatus
}

export class CompiledInstruction {
  @ApiProperty()
  programIdIndex: number
  @ApiProperty()
  accounts: number[]
  @ApiProperty()
  data: string
}

export class CompiledInnerInstruction {
  @ApiProperty()
  index: number
  @ApiProperty()
  instructions: CompiledInstruction[]
}

export class ConfirmedTransactionMeta {
  @ApiProperty()
  fee: number
  @ApiProperty()
  innerInstructions?: CompiledInnerInstruction[] | null
  @ApiProperty()
  preBalances: number[]
  @ApiProperty()
  postBalances: number[]
  @ApiProperty()
  logMessages?: string[] | null
  @ApiProperty()
  preTokenBalances?: TokenBalance[] | null
  @ApiProperty()
  postTokenBalances?: TokenBalance[] | null
  @ApiProperty()
  err: TransactionError | null
}

export class TransactionData {
  @ApiProperty()
  message: Message
  @ApiProperty()
  signatures: string[]
}

export class TransactionResponse {
  @ApiProperty()
  slot: number
  @ApiProperty()
  transaction: TransactionData
  @ApiProperty()
  meta: ConfirmedTransactionMeta | null
  @ApiProperty()
  blockTime?: number | null
}

export class GetTransactionResponse {
  @ApiProperty()
  signature: string
  @ApiProperty({ type: SignatureStatus })
  status: RpcResponseAndContext<SignatureStatus>
  @ApiProperty({ type: TransactionResponse })
  transaction: TransactionResponse
}
