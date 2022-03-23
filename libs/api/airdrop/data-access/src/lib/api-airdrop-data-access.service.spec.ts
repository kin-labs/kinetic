import { Test } from '@nestjs/testing'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'

describe('ApiAirdropDataAccessService', () => {
  let service: ApiAirdropDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiAirdropDataAccessService],
    }).compile()

    service = module.get(ApiAirdropDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
