import { ApiTransactionDataAccessModule } from '@kin-kinetic/api/transaction/data-access'
import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Test } from '@nestjs/testing'
import { ApiCronDataAccessService } from './api-cron-data-access.service'

describe('ApiCronDataAccessService', () => {
  let service: ApiCronDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCronDataAccessService],
      imports: [ApiTransactionDataAccessModule, ApiWalletDataAccessModule],
    }).compile()

    service = module.get(ApiCronDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
