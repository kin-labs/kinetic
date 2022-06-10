import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Test } from '@nestjs/testing'
import { OpenTelemetryModule } from 'nestjs-otel'
import { ApiCoreFeatureController } from './api-core-feature.controller'

describe('ApiCoreFeatureController', () => {
  let controller: ApiCoreFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      imports: [ApiCoreDataAccessModule],
      controllers: [ApiCoreFeatureController],
    }).compile()

    controller = module.get(ApiCoreFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
