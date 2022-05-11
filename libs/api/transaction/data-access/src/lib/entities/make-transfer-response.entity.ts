import { ApiProperty } from '@nestjs/swagger'
import { AppTransactionStatus } from '@prisma/client'

export class MakeTransferResponse {
  @ApiProperty()
  amount?: number
  @ApiProperty()
  destination?: string
  @ApiProperty()
  errors?: any
  @ApiProperty()
  feePayer?: string
  @ApiProperty()
  mint?: string
  @ApiProperty()
  signature?: string
  @ApiProperty()
  solanaStart?: Date
  @ApiProperty()
  solanaEnd?: Date
  @ApiProperty()
  source?: string
  @ApiProperty()
  status?: AppTransactionStatus
}
