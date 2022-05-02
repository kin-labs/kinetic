import { ApiProperty } from '@nestjs/swagger'
import { AppCreationStatus } from '@prisma/client'

interface AccountInfo {
  id: string // publicKey
  balance: string
  owner: string // publicKey
  closeAuthority: string // publicKey
}

export class CreateAccountResponse {
  @ApiProperty()
  account?: AccountInfo
  @ApiProperty()
  signature?: string
  @ApiProperty()
  status?: AppCreationStatus
  @ApiProperty()
  errors?: string[]
  @ApiProperty()
  feePayer?: string[]
  @ApiProperty()
  mint?: string[]
  @ApiProperty()
  solanaStart?: Date
  @ApiProperty()
  solanaEnd?: Date
  @ApiProperty()
  source?: string
}
