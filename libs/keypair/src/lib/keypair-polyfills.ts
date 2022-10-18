// Polyfill the browser, prevents the error "Uncaught ReferenceError: Buffer is not defined"
if (typeof window !== 'undefined' && typeof window.global === 'undefined' && typeof Buffer === 'undefined') {
  window['global'] = window
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.Buffer = require('buffer').Buffer
}

if (typeof TextEncoder === 'undefined' || typeof window === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextEncoder = require('util').TextEncoder
}
