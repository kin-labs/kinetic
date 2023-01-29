import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Test } from '@nestjs/testing'
import { ApiWalletUserService } from './api-wallet-user.service'

describe('ApiWalletUserService', () => {
  let service: ApiWalletUserService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule, ApiWebhookDataAccessModule],
      providers: [ApiWalletUserService],
    }).compile()

    service = module.get(ApiWalletUserService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
