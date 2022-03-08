import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiAccountDataAccessService } from './api-account-data-access.service'

describe('ApiAccountDataAccessService', () => {
  let service: ApiAccountDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiAccountDataAccessService],
    }).compile()

    service = module.get(ApiAccountDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
