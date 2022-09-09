import { ApiProperty } from '@nestjs/swagger'
import {
  Message,
  RpcResponseAndContext,
  TokenBalance,
  TransactionConfirmationStatus,
  TransactionError,
} from '@solana/web3.js'

export class SignatureStatus {
  @ApiProperty({ required: false })
  slot: number | null
  @ApiProperty({ required: false })
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
  @ApiProperty({ required: false })
  fee: number | null
  @ApiProperty()
  innerInstructions?: CompiledInnerInstruction[] | null
  @ApiProperty()
  preBalances: number[]
  @ApiProperty()
  postBalances: number[]
  @ApiProperty({ required: false })
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
  @ApiProperty({ required: false })
  slot: number | null
  @ApiProperty()
  transaction: TransactionData
  @ApiProperty()
  meta: ConfirmedTransactionMeta | null
  @ApiProperty({ required: false })
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
