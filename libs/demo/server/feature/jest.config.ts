/* eslint-disable */
export default {
  displayName: 'demo-server-feature',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/demo/server/feature',
  setupFiles: ['fake-indexeddb/auto'],
}
