import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiSolanaDataAccessService } from './api-solana-data-access.service'

describe('ApiSolanaDataAccessService', () => {
  let service: ApiSolanaDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiSolanaDataAccessService],
    }).compile()

    service = module.get(ApiSolanaDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
