/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).global = window
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = global.Buffer || require('buffer').Buffer
