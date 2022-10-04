import * as encoding from 'text-encoding'

if (typeof TextEncoder === 'undefined') {
  window['global'] = window
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextEncoder = encoding.TextEncoder
}
