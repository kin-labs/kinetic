module.exports = {
  displayName: 'demo-shell-feature',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/demo/shell/feature',
  setupFiles: ['fake-indexeddb/auto'],
}
