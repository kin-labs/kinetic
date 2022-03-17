const getWebpackConfig = require('@nrwl/react/plugins/webpack')

module.exports = (input) => {
  const config = getWebpackConfig(input)

  config.resolve.fallback = {
    assert: false,
    stream: require.resolve('stream-browserify'),
  }
  return config
}
