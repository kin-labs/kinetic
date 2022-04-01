import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiAppDataAccessService } from './api-app-data-access.service'

describe('ApiAppDataAccessService', () => {
  let service: ApiAppDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiAppDataAccessService],
    }).compile()

    service = module.get(ApiAppDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
