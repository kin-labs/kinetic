import { ApiProperty } from '@nestjs/swagger'

import { CompiledInnerInstruction } from './compiled-inner-instruction.entity'
import { TransactionErrorStr } from './signature-status.entity'
import { TokenBalance } from './token-balance.entity'

export class ConfirmedTransactionMeta {
  @ApiProperty({ nullable: true, required: false })
  fee: number | null
  @ApiProperty({ nullable: true, required: false })
  innerInstructions?: CompiledInnerInstruction[] | null
  @ApiProperty({ nullable: true, required: false })
  preBalances: number[]
  @ApiProperty()
  postBalances: number[]
  @ApiProperty({ nullable: true, required: false })
  logMessages?: string[] | null
  @ApiProperty({ nullable: true, required: false })
  preTokenBalances?: TokenBalance[] | null
  @ApiProperty({ nullable: true, required: false })
  postTokenBalances?: TokenBalance[] | null
  @ApiProperty({ nullable: true, required: false })
  err: TransactionErrorStr | null
}
