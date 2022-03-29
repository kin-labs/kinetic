import { Logger, Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@mogami/api/core/feature'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ensureDirSync, existsSync, writeFileSync } from 'fs-extra'
import { join } from 'path'

const rootPath = join(__dirname, '..', 'admin')

@Module({
  imports: [
    ApiCoreFeatureModule,
    ServeStaticModule.forRoot({
      rootPath,
      exclude: ['/api/*', '/graphql'],
    }),
  ],
})
export class AppModule {
  constructor() {
    if (!existsSync(rootPath)) {
      ensureDirSync(rootPath)
      writeFileSync(join(rootPath, 'index.html'), `<pre>Mogami Api</pre>`)
      Logger.verbose(`Created static root path ${rootPath}`)
    }
  }
}
