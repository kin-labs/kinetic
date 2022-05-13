import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

describe('ApiTransactionDataAccessService', () => {
  let service: ApiTransactionDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiAppDataAccessModule],
      providers: [ApiTransactionDataAccessService],
    }).compile()

    service = module.get(ApiTransactionDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
