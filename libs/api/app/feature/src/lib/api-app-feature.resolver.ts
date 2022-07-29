import { App } from '@kin-kinetic/api/app/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => App)
export class ApiAppFeatureResolver {
  @ResolveField(() => String, { nullable: true })
  settingsUrl(@Parent() app: App) {
    return `${app.id}/settings`
  }

  @ResolveField(() => String, { nullable: true })
  defaultEnvUrl(@Parent() app: App) {
    const envId = app.envs.length ? app.envs[0].id : 'create'

    return `${app.id}/environments/${envId}`
  }
}
