import { ExecutorContext, logger, parseTargetString, readTargetOptions, runExecutor } from '@nrwl/devkit'
import jestExecutor from '@nrwl/jest/src/executors/jest/jest.impl'
import { BuildExecutorSchema } from './schema'

export default async function jestDevServer(options: BuildExecutorSchema, context: ExecutorContext) {
  for await (const started of startDevServer(options, context)) {
    logger.debug(`Started api ${started}`)
    try {
      await jestExecutor(options, context)
    } catch (e) {
      logger.error(e.message)

      if (!options?.watch) {
        return { success: false }
      }
    }
  }
  return { success: true }
}

async function* startDevServer(opts: BuildExecutorSchema, context: ExecutorContext) {
  const { project, target, configuration } = parseTargetString(opts.devServerTarget)
  const devServerTargetOpts = readTargetOptions({ project, target, configuration }, context)
  const targetSupportsWatchOpt = Object.keys(devServerTargetOpts).includes('watch')

  for await (const output of await runExecutor<{
    success: boolean
    baseUrl?: string
  }>(
    { project, target, configuration },
    // @NOTE: Do not forward watch option if not supported by the target dev server,
    // this is relevant for running Cypress against dev server target that does not support this option,
    // for instance @nguniversal/builders:ssr-dev-server.
    targetSupportsWatchOpt ? { watch: opts.watch } : {},
    context,
  )) {
    if (!output.success && !opts.watch) throw new Error('Could not compile application files')
    yield true
  }
}
