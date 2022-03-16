import { generateApi } from 'swagger-typescript-api'
import path from 'path'

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  name: 'generated-sdk.ts',
  output: path.resolve(process.cwd(), 'libs/sdk/src/generated'),
  input: path.resolve(process.cwd(), './api-swagger.json'),
  httpClientType: 'fetch',
  prettier: {
    singleQuote: true,
    printWidth: 120,
    semi: false,
    trailingComma: 'all',
    arrowParens: 'always',
    parser: 'typescript',
  },
  singleHttpClient: true,
})
