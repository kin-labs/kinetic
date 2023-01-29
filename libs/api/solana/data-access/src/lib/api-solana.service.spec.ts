import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiSolanaService } from './api-solana.service'

describe('ApiSolanaService', () => {
  let service: ApiSolanaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiSolanaService],
    }).compile()

    service = module.get(ApiSolanaService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
