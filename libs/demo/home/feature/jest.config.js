module.exports = {
  displayName: 'demo-home-feature',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/demo/home/feature',
  setupFiles: ['fake-indexeddb/auto'],
}
