// eslint-disable-next-line @typescript-eslint/no-var-requires
const del = require('del')

module.exports = (on, config) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // require('@cypress/code-coverage/task')(on, config)

  // add other tasks to be registered here
  on('after:spec', (spec, results) => {
    if (results && results.stats.failures === 0 && results.video) {
      return del(results.video, {
        force: true,
      })
    }
  })

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
