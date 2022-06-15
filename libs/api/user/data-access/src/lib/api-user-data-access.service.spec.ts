import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiUserDataAccessService } from './api-user-data-access.service'

describe('ApiUserDataAccessService', () => {
  let service: ApiUserDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiUserDataAccessService],
    }).compile()

    service = module.get(ApiUserDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
