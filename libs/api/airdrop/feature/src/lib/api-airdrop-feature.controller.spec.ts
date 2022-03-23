import { Test } from '@nestjs/testing'
import { ApiAirdropFeatureController } from './api-airdrop-feature.controller'

describe('ApiAirdropFeatureController', () => {
  let controller: ApiAirdropFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAirdropFeatureController],
    }).compile()

    controller = module.get(ApiAirdropFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
