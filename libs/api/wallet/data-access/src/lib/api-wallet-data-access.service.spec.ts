import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Test } from '@nestjs/testing'
import { ApiWalletUserDataAccessService } from './api-wallet-user-data-access.service'

describe('ApiWalletDataAccessService', () => {
  let service: ApiWalletUserDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule, ApiWebhookDataAccessModule],
      providers: [ApiWalletUserDataAccessService],
    }).compile()

    service = module.get(ApiWalletUserDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
