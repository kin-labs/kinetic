import { Test } from '@nestjs/testing'
import { ApiNetworkStatFeatureController } from './api-network-stat-feature.controller'

describe('ApiNetworkStatFeatureController', () => {
  let controller: ApiNetworkStatFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiNetworkStatFeatureController],
    }).compile()

    controller = module.get(ApiNetworkStatFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
