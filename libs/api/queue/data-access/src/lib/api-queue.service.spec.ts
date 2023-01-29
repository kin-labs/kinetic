import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Test } from '@nestjs/testing'
import { ApiQueueService } from './api-queue.service'
import { ApiQueueCloseAccountModule } from './queue/close-account/api-queue-close-account.module'

describe('ApiQueueService', () => {
  let service: ApiQueueService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiQueueCloseAccountModule],
      providers: [ApiQueueService],
    }).compile()

    service = module.get(ApiQueueService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
