import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiNetworkStatDataAccessService } from './api-network-stat-data-access.service'
import { Test } from '@nestjs/testing'

describe('ApiNetworkStatDataAccessService', () => {
  let service: ApiNetworkStatDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiNetworkStatDataAccessService],
    }).compile()

    service = module.get(ApiNetworkStatDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
