import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiWalletDataAccessService } from './api-wallet-data-access.service'

describe('ApiWalletDataAccessService', () => {
  let service: ApiWalletDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule],
      providers: [ApiWalletDataAccessService],
    }).compile()

    service = module.get(ApiWalletDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
