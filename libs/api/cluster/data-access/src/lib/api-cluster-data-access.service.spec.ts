import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiClusterDataAccessService } from './api-cluster-data-access.service'

describe('ApiClusterDataAccessService', () => {
  let service: ApiClusterDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiClusterDataAccessService],
    }).compile()

    service = module.get(ApiClusterDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
