import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Test } from '@nestjs/testing'
import { ApiTransactionService } from './api-transaction.service'

describe('ApiTransactionService', () => {
  let service: ApiTransactionService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule],
      providers: [ApiTransactionService],
    }).compile()

    service = module.get(ApiTransactionService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
