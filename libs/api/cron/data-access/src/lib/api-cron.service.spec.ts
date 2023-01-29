import { ApiTransactionDataAccessModule } from '@kin-kinetic/api/transaction/data-access'
import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Test } from '@nestjs/testing'
import { ApiCronService } from './api-cron.service'

describe('ApiCronService', () => {
  let service: ApiCronService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCronService],
      imports: [ApiTransactionDataAccessModule, ApiWalletDataAccessModule],
    }).compile()

    service = module.get(ApiCronService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
