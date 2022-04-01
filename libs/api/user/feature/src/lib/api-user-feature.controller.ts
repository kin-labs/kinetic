import { Controller } from '@nestjs/common'
import { ApiUserDataAccessService } from '@mogami/api/user/data-access'

@Controller('user')
export class ApiUserFeatureController {
  constructor(private readonly service: ApiUserDataAccessService) {}
}
