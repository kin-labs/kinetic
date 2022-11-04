import { Logger } from '@nestjs/common'
import { ServeStaticModuleOptions } from '@nestjs/serve-static/dist/interfaces/serve-static-options.interface'
import { existsSync } from 'fs-extra'
import { join } from 'path'

export function serveStaticFactory() {
  return function (): ServeStaticModuleOptions[] {
    const rootPath = join(__dirname, '..', 'web')
    const rootExists = existsSync(rootPath)

    if (!rootExists) {
      Logger.verbose(`Static Hosting disabled: root path does not exist: ${rootPath}.`)
      return []
    }

    Logger.verbose(`Static Hosting enabled for: ${rootPath}.`)
    return [
      {
        rootPath,
        exclude: ['/api/*', '/api-docs', '/graphql'],
      },
    ]
  }
}
