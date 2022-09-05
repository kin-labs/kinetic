import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiUserAdminDataAccessService } from './api-user-admin-data-access.service'

describe('ApiUserDataAccessService', () => {
  let service: ApiUserAdminDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiUserAdminDataAccessService],
    }).compile()

    service = module.get(ApiUserAdminDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
