/* eslint-disable */
export default {
  displayName: 'demo-keypair-feature',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/demo/keypair/feature',
  setupFiles: ['fake-indexeddb/auto'],
}
