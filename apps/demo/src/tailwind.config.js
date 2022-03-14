const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')

const { join } = require('path')

module.exports = {
  content: [join(__dirname, '**/!(*.stories|*.spec).{ts,tsx,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['dark', 'light'],
  },
}
