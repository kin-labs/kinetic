const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: getJestProjects(),
  testTimeout: 20000,
}
