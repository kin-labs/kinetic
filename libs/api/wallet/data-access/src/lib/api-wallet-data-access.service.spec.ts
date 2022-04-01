import { Test } from '@nestjs/testing'
import { ApiWalletDataAccessService } from './api-wallet-data-access.service'

describe('ApiWalletDataAccessService', () => {
  let service: ApiWalletDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWalletDataAccessService],
    }).compile()

    service = module.get(ApiWalletDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
