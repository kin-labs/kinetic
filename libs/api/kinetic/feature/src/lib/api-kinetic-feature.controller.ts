import { Controller } from '@nestjs/common'
import { ApiKineticService } from '@kin-kinetic/api/kinetic/data-access'

@Controller('kinetic')
export class ApiKineticFeatureController {
  constructor(private readonly service: ApiKineticService) {}
}
