module.exports = (on, config) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@cypress/code-coverage/task')(on, config)

  // add other tasks to be registered here

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
