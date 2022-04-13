module.exports = {
  displayName: 'demo-sdk-feature',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/demo/sdk/feature',
  setupFiles: ['fake-indexeddb/auto'],
}
