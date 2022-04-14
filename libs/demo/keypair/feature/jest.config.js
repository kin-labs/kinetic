module.exports = {
  displayName: 'demo-keypair-feature',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/demo/keypair/feature',
  setupFiles: ['fake-indexeddb/auto'],
}
