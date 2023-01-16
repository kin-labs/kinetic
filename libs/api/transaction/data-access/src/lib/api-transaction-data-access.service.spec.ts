import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Test } from '@nestjs/testing'
import { ApiTransactionDataAccessService } from './api-transaction-data-access.service'

describe('ApiTransactionDataAccessService', () => {
  let service: ApiTransactionDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule],
      providers: [ApiTransactionDataAccessService],
    }).compile()

    service = module.get(ApiTransactionDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
