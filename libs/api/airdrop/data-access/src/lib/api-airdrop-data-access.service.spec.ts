import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Test } from '@nestjs/testing'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'

describe('ApiAirdropDataAccessService', () => {
  let service: ApiAirdropDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule],
      providers: [ApiAirdropDataAccessService],
    }).compile()

    service = module.get(ApiAirdropDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
