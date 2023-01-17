import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Test } from '@nestjs/testing'
import { ApiAppDataAccessService } from './api-app-data-access.service'

describe('ApiAppDataAccessService', () => {
  let service: ApiAppDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule, ApiWalletDataAccessModule],
      providers: [ApiAppDataAccessService],
    }).compile()

    service = module.get(ApiAppDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
