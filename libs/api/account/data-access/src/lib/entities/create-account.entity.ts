import { ApiProperty } from '@nestjs/swagger'
import { AppCreationStatus } from '@prisma/client'

export class CreateAccountResponse {
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
  status?: AppCreationStatus
}
