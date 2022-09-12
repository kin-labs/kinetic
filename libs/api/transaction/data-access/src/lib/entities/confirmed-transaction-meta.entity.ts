import { ApiProperty } from '@nestjs/swagger'

import { CompiledInnerInstruction } from './compiled-inner-instruction.entity'
import { TransactionErrorStr } from './signature-status.entity'
import { TokenBalance } from './token-balance.entity'

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
  @ApiProperty({ required: false })
  preTokenBalances?: TokenBalance[] | null
  @ApiProperty({ required: false })
  postTokenBalances?: TokenBalance[] | null
  @ApiProperty({ required: false })
  err: TransactionErrorStr | null
}
