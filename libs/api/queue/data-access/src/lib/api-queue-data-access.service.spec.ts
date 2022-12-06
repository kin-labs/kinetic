import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiQueueDataAccessService } from './api-queue-data-access.service'
import { ApiQueueCloseAccountModule } from './queue/close-account/api-queue-close-account.module'

describe('ApiQueueDataAccessService', () => {
  let service: ApiQueueDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiQueueCloseAccountModule],
      providers: [ApiQueueDataAccessService],
    }).compile()

    service = module.get(ApiQueueDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
