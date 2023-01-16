import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiSolanaDataAccessModule } from '@kin-kinetic/api/solana/data-access'
import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Test } from '@nestjs/testing'
import { ApiKineticService } from './api-kinetic.service'

describe('ApiKineticDataAccessService', () => {
  let service: ApiKineticService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule, ApiWebhookDataAccessModule],
      providers: [ApiKineticService],
    }).compile()

    service = module.get(ApiKineticService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
