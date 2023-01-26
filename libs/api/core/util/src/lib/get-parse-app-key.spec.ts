import { getAppKey, parseAppKey } from './get-parse-app-key'

describe('getParseAppKey', () => {
  it('should parse and return an app key', () => {
    const environment = 'devnet'
    const index = 1

    const key = getAppKey(environment, index)
    const parsed = parseAppKey(key)
    expect(parsed.environment).toMatch(environment)
    expect(parsed.index).toEqual(index)
  })

  it('should parse and return an app key with an environment with multiple dashes', () => {
    const environment = 'this-is-some-devnet-alias'
    const index = 1

    const key = getAppKey(environment, index)
    const parsed = parseAppKey(key)
    expect(parsed.environment).toMatch(environment)
    expect(parsed.index).toEqual(index)
  })
})
