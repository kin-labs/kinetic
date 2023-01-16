import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiKineticService } from './api-kinetic.service'

describe('ApiKineticDataAccessService', () => {
  let service: ApiKineticService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiKineticService],
    }).compile()

    service = module.get(ApiKineticService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
