import { ApiUserDataAccessService } from '@mogami/api/user/data-access'
import { Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiUserFeatureResolver {
  constructor(private readonly service: ApiUserDataAccessService) {}
}
