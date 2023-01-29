import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiUserAdminService } from './api-user-admin.service'

describe('ApiUserService', () => {
  let service: ApiUserAdminService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiUserAdminService],
    }).compile()

    service = module.get(ApiUserAdminService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
