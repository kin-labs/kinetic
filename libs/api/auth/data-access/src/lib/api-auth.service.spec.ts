import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { JwtModule } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { ApiAuthService } from './api-auth.service'

describe('ApiAuthService', () => {
  let service: ApiAuthService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ApiAppDataAccessModule,
        ApiCoreDataAccessModule,
        JwtModule.register({ secret: process.env.JWT_SECRET }),
      ],
      providers: [ApiAuthService],
    }).compile()

    service = module.get(ApiAuthService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
