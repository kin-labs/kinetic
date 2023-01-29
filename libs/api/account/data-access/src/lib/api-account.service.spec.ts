import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Test } from '@nestjs/testing'
import { ApiAccountService } from './api-account.service'

describe('ApiAccountService', () => {
  let service: ApiAccountService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiAppDataAccessModule, ApiCoreDataAccessModule, ApiKineticDataAccessModule],
      providers: [ApiAccountService],
    }).compile()

    service = module.get(ApiAccountService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
