import { ApiProperty } from '@nestjs/swagger'

import { CompiledInnerInstruction } from './compiled-inner-instruction.entity'
import { TransactionErrorStr } from './signature-status.entity'
import { TokenBalance } from './token-balance.entity'

export class ConfirmedTransactionMeta {
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  fee: number | null
  @ApiProperty({ type: [CompiledInnerInstruction], nullable: true, required: false })
  innerInstructions?: CompiledInnerInstruction[] | null
  @ApiProperty({ isArray: true, nullable: true, required: false, type: 'integer' })
  preBalances: number[]
  @ApiProperty({ isArray: true, type: 'integer' })
  postBalances: number[]
  @ApiProperty({ nullable: true, required: false })
  logMessages?: string[] | null
  @ApiProperty({ type: [TokenBalance], nullable: true, required: false })
  preTokenBalances?: TokenBalance[] | null
  @ApiProperty({ type: [TokenBalance], nullable: true, required: false })
  postTokenBalances?: TokenBalance[] | null
  @ApiProperty({ nullable: true, required: false })
  err: TransactionErrorStr | null
}
