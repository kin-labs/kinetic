import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Test } from '@nestjs/testing'
import { ApiAirdropService } from './api-airdrop.service'

describe('ApiAirdropService', () => {
  let service: ApiAirdropService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule],
      providers: [ApiAirdropService],
    }).compile()

    service = module.get(ApiAirdropService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
