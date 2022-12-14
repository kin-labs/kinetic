import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiSolanaDataAccessModule } from '@kin-kinetic/api/solana/data-access'
import { Test } from '@nestjs/testing'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'

describe('ApiAirdropDataAccessService', () => {
  let service: ApiAirdropDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
      providers: [ApiAirdropDataAccessService],
    }).compile()

    service = module.get(ApiAirdropDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
