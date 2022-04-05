import task from '@cypress/code-coverage/task'

export default function (on, config) {
  task(on, config)
  config.env = {
    ...process.env,
    ...config.env, // Don't overwrite `codeCoverageTasksRegistered` set by `@cypress/code-coverage/task`
  }
  return config
}
