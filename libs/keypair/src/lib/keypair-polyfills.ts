if (typeof TextEncoder === 'undefined' || typeof window === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextEncoder = require('util').TextEncoder
}
